import assert from 'node:assert/strict';
import test from 'node:test';
import { SafeStorage } from '../assets/js/core/storage.js';
import { LearnerStorageService } from '../assets/js/services/learner-storage-service.js';

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    value: key => values.get(key),
  };
}

test('safe storage returns fallbacks when browser storage throws', () => {
  const errors = [];
  const storage = new SafeStorage({
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('full'); },
  }, { error: (...args) => errors.push(args) });

  assert.equal(storage.get('key', 'fallback'), 'fallback');
  assert.equal(storage.set('key', 'value'), false);
  assert.equal(errors.length, 2);
});

test('safe storage distinguishes a missing value from an empty string', () => {
  const raw = memoryStorage({ empty: '' });
  const storage = new SafeStorage(raw);
  assert.equal(storage.get('empty', 'fallback'), '');
  assert.equal(storage.get('missing', 'fallback'), 'fallback');
});

test('learner storage recovers from invalid persisted JSON', () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    const local = new SafeStorage(memoryStorage({ 'hagpy.learning-progress': '{invalid' }));
    const session = new SafeStorage(memoryStorage());
    const service = new LearnerStorageService(local, session);
    assert.deepEqual(service.loadProgress().toJSON().completedLessonIds, []);
  } finally {
    console.error = originalError;
  }
});

test('local notice is shown once per session', () => {
  const sessionRaw = memoryStorage();
  const service = new LearnerStorageService(
    new SafeStorage(memoryStorage()),
    new SafeStorage(sessionRaw),
  );
  assert.equal(service.shouldShowLocalNotice(), true);
  service.markLocalNoticeShown();
  assert.equal(service.shouldShowLocalNotice(), false);
});

test('reset progress clears completed lessons', () => {
  const localRaw = memoryStorage({
    'hagpy.learning-progress': JSON.stringify({ completedLessonIds: [1, 2] }),
  });
  const service = new LearnerStorageService(
    new SafeStorage(localRaw),
    new SafeStorage(memoryStorage()),
  );
  assert.equal(service.resetProgress(), true);
  assert.deepEqual(service.loadProgress().toJSON().completedLessonIds, []);
});
