import assert from 'node:assert/strict';
import test from 'node:test';
import { curriculumLessonsFrom } from '../assets/js/controllers/learner-controller.js';

test('learner controller tolerates a missing or malformed curriculum manifest', () => {
  assert.deepEqual(curriculumLessonsFrom(), []);
  assert.deepEqual(curriculumLessonsFrom({}), []);
  assert.deepEqual(curriculumLessonsFrom({ curriculum: {} }), []);
  assert.deepEqual(curriculumLessonsFrom({ curriculum: { lessons: {} } }), []);
});

test('learner controller uses lessons from a valid curriculum manifest', () => {
  const lessons = [{ id: 72, position: 1, slug: 'course-welcome' }];
  assert.equal(curriculumLessonsFrom({ curriculum: { lessons } }), lessons);
});
