import { readFile } from 'node:fs/promises';
import { lessonRecords } from './lesson-records.js';

const lessonsDirectory = new URL('./lessons/', import.meta.url);
const recordsById = new Map(lessonRecords.map((record) => [record.id, record]));

function parseFrontmatter(source, fileName) {
  const normalized = source.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`${fileName} must start with frontmatter`);
  }

  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    throw new Error(`${fileName} frontmatter is not closed`);
  }

  const meta = Object.create(null);
  const header = normalized.slice(4, end);
  for (const line of header.split('\n')) {
    if (!line.trim()) continue;
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!match) throw new Error(`${fileName} has invalid frontmatter line: ${line}`);
    meta[match[1]] = match[2].trim();
  }

  return {
    meta,
    body: normalized.slice(end + 5).trim(),
  };
}

function parseAttributes(source) {
  const attributes = Object.create(null);
  const matcher = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
  let match = matcher.exec(source);
  while (match) {
    attributes[match[1]] = match[2];
    match = matcher.exec(source);
  }
  return attributes;
}

function parseBlocks(body, fileName) {
  const lines = body.split('\n');
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const opening = lines[index].match(/^:::([a-zA-Z0-9_-]+)(.*)$/);
    if (!opening) {
      if (lines[index].trim()) throw new Error(`${fileName} has content outside a block near: ${lines[index]}`);
      continue;
    }

    const content = [];
    index += 1;
    while (index < lines.length && lines[index].trim() !== ':::') {
      content.push(lines[index]);
      index += 1;
    }

    if (index >= lines.length) throw new Error(`${fileName} has an unclosed ${opening[1]} block`);

    blocks.push({
      type: opening[1],
      attrs: parseAttributes(opening[2]),
      content: content.join('\n').trim(),
    });
  }

  return blocks;
}

function extractCode(blocks) {
  const codeBlock = blocks.find((block) => block.type === 'codeExample');
  if (!codeBlock) return '';
  const match = codeBlock.content.match(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/);
  return match ? match[1].trim() : codeBlock.content.trim();
}

function extractChecklist(blocks) {
  const checklist = blocks.find((block) => block.type === 'checklist');
  if (!checklist) return [];
  return checklist.content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

async function readLesson(record, locale) {
  const fileName = `${record.source}.${locale}.md`;
  const source = await readFile(new URL(fileName, lessonsDirectory), 'utf8');
  const parsed = parseFrontmatter(source, fileName);

  return {
    ...parsed,
    blocks: parseBlocks(parsed.body, fileName),
  };
}

export async function loadCurriculum(curriculumTracks) {
  const lessons = [];
  const tracks = [];

  for (const track of curriculumTracks) {
    const resolvedLessons = [];

    for (const lessonId of track.lessons) {
      const record = recordsById.get(lessonId);
      if (!record) throw new Error(`Unknown lesson id ${lessonId} in track ${track.id}`);

      const [enSource, heSource] = await Promise.all([
        readLesson(record, 'en'),
        readLesson(record, 'he'),
      ]);

      if (Number(enSource.meta.id) !== lessonId || Number(heSource.meta.id) !== lessonId) {
        throw new Error(`Lesson file id mismatch for lesson ${lessonId}`);
      }

      if (enSource.meta.slug !== record.slug || heSource.meta.slug !== record.slug) {
        throw new Error(`Lesson file slug mismatch for lesson ${lessonId}`);
      }

      const lesson = {
        id: lessonId,
        slug: record.slug,
        source: record.source,
        en: enSource.meta.title,
        he: heSource.meta.title,
        introEn: enSource.meta.intro,
        introHe: heSource.meta.intro,
        layout: enSource.meta.layout || 'blocks',
        trackId: track.id,
        trackEn: track.en,
        trackHe: track.he,
        blocksEn: enSource.blocks,
        blocksHe: heSource.blocks,
        code: extractCode(enSource.blocks),
        pointsEn: extractChecklist(enSource.blocks),
        pointsHe: extractChecklist(heSource.blocks),
      };

      lessons.push(lesson);
      resolvedLessons.push(lesson);
    }

    tracks.push({
      ...track,
      lessons: resolvedLessons,
    });
  }

  return { lessons, tracks };
}
