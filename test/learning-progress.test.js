import assert from 'node:assert/strict';
import test from 'node:test';
import { LearningProgress } from '../assets/js/models/learning-progress.js';

test('migrates legacy lesson slugs and the legacy highest index', () => {
  const progress = new LearningProgress({
    lastLessonSlug: 'syntax',
    highestLessonIndex: 4,
    completedLessons: ['syntax', 'missing'],
  });

  progress.migrateSlugs([{ id: 12, slug: 'syntax' }]);

  assert.equal(progress.lastLessonId, 12);
  assert.equal(progress.highestLessonPosition, 5);
  assert.deepEqual([...progress.completedLessonIds], [12]);
  assert.equal(progress.lastLessonSlug, null);
  assert.deepEqual(progress.legacyCompletedSlugs, []);
});

test('keeps the new numeric id when legacy data is also present', () => {
  const progress = new LearningProgress({ lastLessonId: 8, lastLessonSlug: 'syntax' });
  progress.migrateSlugs([{ id: 12, slug: 'syntax' }]);
  assert.equal(progress.lastLessonId, 8);
});

test('filters invalid completed ids and removes ids no longer in the curriculum', () => {
  const progress = new LearningProgress({ completedLessonIds: [1, 1, 2, -3, 4.5, '5'] });
  progress.prune([2]);
  assert.deepEqual([...progress.completedLessonIds], [2]);
});

test('prune clears a last lesson that no longer exists', () => {
  const progress = new LearningProgress({ lastLessonId: 99 });
  progress.prune([1, 2]);
  assert.equal(progress.lastLessonId, null);
});

test('visiting an earlier lesson never moves the highest position backwards', () => {
  const progress = new LearningProgress({ highestLessonPosition: 10 });
  progress.visit(3, 3);
  assert.equal(progress.lastLessonId, 3);
  assert.equal(progress.highestLessonPosition, 10);
  assert.match(progress.lastVisitedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('percentage handles empty totals and never exceeds one hundred', () => {
  const progress = new LearningProgress({ completedLessonIds: [1, 2, 3] });
  assert.equal(progress.percentage(0), 0);
  assert.equal(progress.percentage(-1), 0);
  assert.equal(progress.percentage(Number.NaN), 0);
  assert.equal(progress.percentage(2), 100);
  assert.equal(progress.percentage(6), 50);
});

test('serialization returns arrays instead of exposing the internal Set', () => {
  const progress = new LearningProgress({ completedLessonIds: [2, 1] });
  assert.deepEqual(progress.toJSON().completedLessonIds, [2, 1]);
  assert.ok(Array.isArray(progress.toJSON().completedLessonIds));
});
