import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = { fetch() {} };
globalThis.document = {
  baseURI: 'https://example.test/pages/lesson.html',
  documentElement: {},
};

const { I18nService } = await import('../assets/js/services/i18n-service.js');

const manifest = {
  defaultLocale: 'en',
  locales: {
    en: { file: 'en.json', direction: 'ltr', label: 'English', shortLabel: 'EN' },
    he: { file: 'he.json', direction: 'rtl', label: 'עברית', shortLabel: 'עב' },
  },
};
const payloads = new Map([
  ['/assets/locales/manifest.json', manifest],
  ['/assets/locales/en.json', { greeting: 'Hello {name}' }],
  ['/assets/locales/he.json', { greeting: 'שלום {name}' }],
]);
const fetcher = async url => ({
  ok: payloads.has(url.pathname),
  status: payloads.has(url.pathname) ? 200 : 404,
  async json() { return payloads.get(url.pathname); },
});

test('loads catalogs, interpolates values, and updates document direction', async () => {
  const i18n = new I18nService({
    baseUrl: new URL('https://example.test/assets/locales/'),
    fetcher,
  });
  await i18n.initialize('en');
  assert.equal(i18n.t('greeting', { name: 'Maya' }), 'Hello Maya');
  assert.equal(document.documentElement.dir, 'ltr');
  await i18n.setLocale('he');
  assert.equal(i18n.t('greeting', { name: 'מאיה' }), 'שלום מאיה');
  assert.equal(document.documentElement.lang, 'he');
  assert.equal(document.documentElement.dir, 'rtl');
  assert.equal(i18n.nextLocale(), 'en');
});
