import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { openingLessonId, tracks as curriculumTracks } from '../content/curriculum.js';
import { lessonRecords } from '../content/lesson-records.js';
import { loadCurriculum } from '../content/lesson-loader.js';

const root = new URL('../', import.meta.url);
const { lessons, tracks } = await loadCurriculum(curriculumTracks, { openingLessonId });

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

  assert.equal(lessons.length, 72);
  assert.equal(htmlPages.length, expectedPages.length);
  assert.deepEqual(htmlPages, expectedPages);
});

test('curriculum uses stable numeric ids and lesson content lives in Markdown', async () => {
  assert.equal(lessons.length, 72);

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

test('runtime curriculum manifest separates stable ids from lesson positions', async () => {
  const manifest = JSON.parse(await readFile(new URL('assets/data/curriculum.json', root), 'utf8'));
  assert.equal(manifest.totalLessons, 72);
  assert.equal(manifest.openingLessonId, 72);

  const positions = manifest.lessons.map(lesson => lesson.position);
  assert.deepEqual(positions, Array.from({ length: 72 }, (_, index) => index + 1));

  for (const lesson of manifest.lessons) {
    assert.equal(typeof lesson.id, 'number');
    assert.equal(typeof lesson.position, 'number');
    assert.notEqual(lesson.id, undefined);
    assert.match(lesson.titleKey, /^lessons\..+\.title$/);
  }

  assert.deepEqual(manifest.tracks[1].lessons, [7, 8, 9, 10, 11]);
});

test('lesson pages defer navigation, breadcrumbs and sidebar composition to runtime ids', async () => {
  const html = await readFile(new URL('pages/uv.html', root), 'utf8');
  const config = JSON.parse(html.match(/<script id="page-config" type="application\/json">([^<]+)<\/script>/)[1]);

  assert.deepEqual(config, { lessonId: 8, totalLessons: 72, exercise: null });
  assert.match(html, /data-curriculum-sidebar/);
  assert.match(html, /data-breadcrumbs/);
  assert.match(html, /data-lesson-position/);
  assert.match(html, /data-lesson-navigation/);
  assert.doesNotMatch(html, /href="project-setup\.html"/);
  assert.doesNotMatch(html, /href="first-html-site\.html"/);
  assert.doesNotMatch(html, /data-lesson-slug/);
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

test('course welcome is first without changing stable ids or chapter one membership', async () => {
  assert.equal(openingLessonId, 72);
  assert.equal(lessons[0].id, 72);
  assert.equal(lessons[0].position, 1);
  assert.equal(lessons[0].slug, 'course-welcome');
  assert.equal(lessons[0].trackId, null);
  assert.equal(lessons.find(lesson => lesson.id === 1).position, 2);
  assert.deepEqual(curriculumTracks[0].lessons, [1, 2, 3, 4, 5, 6]);

  const html = await readFile(new URL('pages/course-welcome.html', root), 'utf8');
  assert.match(html, /data-lesson-navigation/);
  assert.match(html, /assets\/css\/navigation-refinements\.css/);
  assert.match(html, /lessons\.course-welcome\.blocks\.6\.title/);
  assert.doesNotMatch(html, /exercise\.local\.title/);
});

test('key Hebrew lesson names match the approved wording', () => {
  const bySlug = Object.fromEntries(lessons.map(lesson => [lesson.slug, lesson]));

  assert.equal(bySlug['verify-installation'].he, 'בדיקת ההתקנה');
  assert.equal(bySlug['project-setup'].he, 'הקמת פרוייקט וניהול ספריות');
  assert.equal(bySlug.uv.he, 'תלויות עם uv');
  assert.equal(bySlug['first-html-site'].he, 'בניית אתר מקומי');
});
