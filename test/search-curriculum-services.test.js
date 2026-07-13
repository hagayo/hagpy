import assert from 'node:assert/strict';
import test from 'node:test';
import { CurriculumService } from '../assets/js/services/curriculum-service.js';
import { SearchService } from '../assets/js/services/search-service.js';

test('search accepts an empty item source and null query', () => {
  const search = new SearchService(undefined);
  assert.deepEqual(search.search(null, value => value, 'en'), []);
});

test('search trims input and matches translated titles case-insensitively', () => {
  const items = [{ id: 1, titleKey: 'one' }, { id: 2, titleKey: 'two' }];
  const titles = { one: 'Python Basics', two: 'Git workflow' };
  const search = new SearchService(items);
  assert.deepEqual(search.search('  PYTHON ', key => titles[key], 'en'), [items[0]]);
});

test('search tolerates a missing translated value', () => {
  const search = new SearchService([{ id: 1, titleKey: 'missing' }]);
  assert.deepEqual(search.search('python', () => undefined, 'en'), []);
});

test('curriculum service caches successful requests', async () => {
  let requests = 0;
  const manifest = { lessons: [], tracks: [] };
  const service = new CurriculumService({
    baseUrl: new URL('https://example.test/assets/data/'),
    fetcher: async () => {
      requests += 1;
      return { ok: true, async json() { return manifest; } };
    },
  });

  assert.equal(await service.load(), manifest);
  assert.equal(await service.load(), manifest);
  assert.equal(requests, 1);
});

test('concurrent curriculum loads share one request', async () => {
  let requests = 0;
  const manifest = { lessons: [], tracks: [] };
  const service = new CurriculumService({
    fetcher: async () => {
      requests += 1;
      return { ok: true, async json() { return manifest; } };
    },
  });

  const [first, second] = await Promise.all([service.load(), service.load()]);
  assert.equal(first, manifest);
  assert.equal(second, manifest);
  assert.equal(requests, 1);
});

test('curriculum service reports HTTP and malformed-manifest failures', async () => {
  const failed = new CurriculumService({
    fetcher: async () => ({ ok: false, status: 503 }),
  });
  await assert.rejects(failed.load(), /503/);

  const malformed = new CurriculumService({
    fetcher: async () => ({ ok: true, async json() { return { lessons: {} }; } }),
  });
  await assert.rejects(malformed.load(), /Invalid curriculum manifest/);
});

test('curriculum service can retry after a temporary failure', async () => {
  let requests = 0;
  const service = new CurriculumService({
    fetcher: async () => {
      requests += 1;
      if (requests === 1) return { ok: false, status: 503 };
      return { ok: true, async json() { return { lessons: [], tracks: [] }; } };
    },
  });

  await assert.rejects(service.load(), /503/);
  assert.deepEqual(await service.load(), { lessons: [], tracks: [] });
  assert.equal(requests, 2);
});
