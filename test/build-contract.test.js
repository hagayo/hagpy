import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { lessons, tracks } from '../content/curriculum.js';

const root = new URL('../', import.meta.url);

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

test('first chapters follow the approved learning order', () => {
  assert.deepEqual(tracks.slice(0, 3).map(track => [track.id, track.he]), [
    ['start', 'מתחילים'],
    ['first-project', 'פרוייקט ראשון'],
    ['python', 'יסודות Python']
  ]);

  assert.deepEqual(tracks[0].lessons.map(lesson => lesson.slug), [
    'windows-setup',
    'install-git',
    'install-uv-python',
    'github-account-repo',
    'verify-installation',
    'setup-troubleshooting'
  ]);

  assert.deepEqual(tracks[1].lessons.map(lesson => lesson.slug), [
    'uv',
    'project-setup',
    'first-html-site',
    'push-first-repository',
    'publish-github-pages'
  ]);
});

test('key Hebrew lesson names match the approved wording', () => {
  const bySlug = Object.fromEntries(lessons.map(lesson => [lesson.slug, lesson]));

  assert.equal(bySlug['verify-installation'].he, 'בדיקת ההתקנה');
  assert.equal(bySlug['project-setup'].he, 'הקמת פרוייקט');
  assert.equal(bySlug['first-html-site'].he, 'בניית אתר מקומי');
});
