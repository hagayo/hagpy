import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { tracks as curriculumTracks } from '../content/curriculum.js';
import { lessonRecords } from '../content/lesson-records.js';
import { loadCurriculum } from '../content/lesson-loader.js';

const root = new URL('../', import.meta.url);
const { lessons, tracks } = await loadCurriculum(curriculumTracks);

test('every locale catalog has the same non-empty key set', async () => {
  const manifest = JSON.parse(await readFile(new URL('assets/locales/manifest.json', root), 'utf8'));
  const catalogs = await Promise.all(Object.values(manifest.locales).map(locale => (
    readFile(new URL(`assets/locales/${locale.file}`, root), 'utf8').then(JSON.parse)
  )));
  const expectedKeys = Object.keys(catalogs[0]).sort();
  assert.ok(expectedKeys.length > 900);
  for (const catalog of catalogs) {
    assert.deepEqual(Object.keys(catalog).sort(), expectedKeys);
    for (const key of expectedKeys) {
      assert.equal(typeof catalog[key], 'string', key);
      assert.ok(catalog[key].length > 0, key);
    }
  }
});

test('generated pages use translation keys instead of inline bilingual data', async () => {
  const locale = JSON.parse(await readFile(new URL('assets/locales/en.json', root), 'utf8'));
  const pageNames = await readdir(new URL('pages/', root));
  const htmlFiles = [new URL('index.html', root), ...pageNames.filter(name => name.endsWith('.html')).map(name => new URL(`pages/${name}`, root))];
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    assert.doesNotMatch(html, /data-(?:en|he)=/);
    assert.doesNotMatch(html, /"(?:en|he)"\s*:/);
    assert.doesNotMatch(html, /locale(?:Base|Manifest)Path/);
    const keys = [...html.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)].map(match => match[1]);
    for (const key of keys) assert.ok(Object.hasOwn(locale, key), `${file.pathname}: ${key}`);
  }
});

test('curriculum generates one page per lesson', async () => {
  const pageNames = await readdir(new URL('pages/', root));
  const htmlPages = pageNames.filter(name => name.endsWith('.html')).sort();
  const expectedPages = lessons.map(lesson => `${lesson.slug}.html`).sort();

  assert.equal(lessons.length, 71);
  assert.equal(htmlPages.length, expectedPages.length);
  assert.deepEqual(htmlPages, expectedPages);
});

test('curriculum uses stable numeric ids and lesson content lives in Markdown', async () => {
  assert.equal(lessons.length, 71);

  const recordIds = new Set(lessonRecords.map(record => record.id));
  assert.equal(recordIds.size, lessonRecords.length);

  for (const track of curriculumTracks) {
    assert.ok(Array.isArray(track.lessons));
    assert.ok(track.lessons.length > 0);

    for (const lessonId of track.lessons) {
      assert.equal(typeof lessonId, 'number');
      assert.ok(recordIds.has(lessonId), `missing lesson record for id ${lessonId}`);
    }
  }

  for (const record of lessonRecords) {
    await access(new URL(`content/lessons/${record.source}.en.md`, root));
    await access(new URL(`content/lessons/${record.source}.he.md`, root));
  }
});

test('first chapters follow the approved learning order', () => {
  assert.deepEqual(tracks.slice(0, 3).map(track => [track.id, track.he]), [
    ['start', 'מתחילים'],
    ['first-project', 'הפרוייקט הראשון שלנו'],
    ['python', 'יסודות Python']
  ]);

  assert.deepEqual(curriculumTracks[0].lessons, [1, 2, 3, 4, 5, 6]);

  assert.deepEqual(curriculumTracks[1].lessons, [7, 8, 9, 10, 11]);

  assert.deepEqual(tracks[1].lessons.map(lesson => lesson.he), [
    'הקמת פרוייקט וניהול ספריות',
    'תלויות עם uv',
    'בניית אתר מקומי',
    'העלאת הפרויקט ל-GitHub',
    'פרסום באמצעות GitHub Pages'
  ]);
});

test('key Hebrew lesson names match the approved wording', () => {
  const bySlug = Object.fromEntries(lessons.map(lesson => [lesson.slug, lesson]));

  assert.equal(bySlug['verify-installation'].he, 'בדיקת ההתקנה');
  assert.equal(bySlug['project-setup'].he, 'הקמת פרוייקט וניהול ספריות');
  assert.equal(bySlug.uv.he, 'תלויות עם uv');
  assert.equal(bySlug['first-html-site'].he, 'בניית אתר מקומי');
});
