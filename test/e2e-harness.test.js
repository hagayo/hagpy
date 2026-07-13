import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('browser smoke harness covers critical production behavior', async () => {
  const [app, runner, page] = await Promise.all([
    readFile(new URL('assets/js/app.js', root), 'utf8'),
    readFile(new URL('e2e/smoke.js', root), 'utf8'),
    readFile(new URL('e2e/index.html', root), 'utf8'),
  ]);

  assert.match(app, /dataset\.appStatus = 'loading'/);
  assert.match(app, /dataset\.appStatus = 'ready'/);
  assert.match(app, /dataset\.appStatus = 'error'/);
  assert.match(runner, /assets\/data\/curriculum\.json/);
  assert.match(runner, /language changes without reload/);
  assert.match(runner, /previous and next links come from curriculum positions/);
  assert.match(runner, /code remains LTR/);
  assert.match(page, /smoke\.js/);
});
