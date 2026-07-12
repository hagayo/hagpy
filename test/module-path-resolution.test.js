import assert from 'node:assert/strict';
import test from 'node:test';

const requestedUrls = [];
globalThis.window = {
  fetch: async url => {
    requestedUrls.push(url);
    if (url.pathname.endsWith('/manifest.json')) {
      return {
        ok: true,
        async json() {
          return {
            defaultLocale: 'en',
            locales: { en: { file: 'en.json', direction: 'ltr', label: 'English', shortLabel: 'EN' } },
          };
        },
      };
    }
    return { ok: true, async json() { return { key: 'value' }; } };
  },
};
globalThis.document = {
  baseURI: 'https://example.test/arbitrary/deep/page.html',
  documentElement: {},
};

const { I18nService } = await import('../assets/js/services/i18n-service.js');
const { PythonRunnerService } = await import('../assets/js/services/python-runner-service.js');

test('production asset URLs are resolved from their owning modules', async () => {
  const i18n = new I18nService();
  await i18n.initialize('en');
  assert.match(requestedUrls[0].pathname, /\/assets\/locales\/manifest\.json$/);
  assert.match(requestedUrls[1].pathname, /\/assets\/locales\/en\.json$/);
  assert.doesNotMatch(requestedUrls[0].href, /arbitrary\/deep/);

  const runner = new PythonRunnerService();
  assert.match(runner.workerUrl.pathname, /\/assets\/js\/workers\/python-worker\.js$/);
  assert.doesNotMatch(runner.workerUrl.href, /arbitrary\/deep/);
});
