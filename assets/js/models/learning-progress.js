export class LearningProgress {
  constructor({
    lastLessonId = null,
    lastLessonSlug = null,
    highestLessonPosition = 0,
    highestLessonIndex = -1,
    completedLessonIds = [],
    completedLessons = [],
    passedExercises = {},
    lastVisitedAt = null,
  } = {}) {
    this.lastLessonId = Number.isInteger(lastLessonId) ? lastLessonId : null;
    this.lastLessonSlug = lastLessonSlug;
    this.highestLessonPosition = Number.isInteger(highestLessonPosition)
      ? highestLessonPosition
      : highestLessonIndex + 1;
    this.completedLessonIds = new Set(
      Array.isArray(completedLessonIds) ? completedLessonIds.filter(Number.isInteger) : [],
    );
    this.legacyCompletedSlugs = Array.isArray(completedLessons) ? completedLessons : [];
    this.passedExercises = passedExercises && typeof passedExercises === 'object' ? { ...passedExercises } : {};
    this.lastVisitedAt = lastVisitedAt;
  }

  migrateSlugs(lessons) {
    const bySlug = new Map(lessons.map(lesson => [lesson.slug, lesson]));
    for (const slug of this.legacyCompletedSlugs) {
      const lesson = bySlug.get(slug);
      if (lesson) this.completedLessonIds.add(lesson.id);
    }
    if (!this.lastLessonId && this.lastLessonSlug && bySlug.has(this.lastLessonSlug)) {
      this.lastLessonId = bySlug.get(this.lastLessonSlug).id;
    }
    this.legacyCompletedSlugs = [];
    this.lastLessonSlug = null;
  }

  visit(lessonId, position) {
    this.lastLessonId = lessonId;
    this.highestLessonPosition = Math.max(this.highestLessonPosition, position);
    this.lastVisitedAt = new Date().toISOString();
  }

  completeLesson(lessonId) {
    this.completedLessonIds.add(lessonId);
  }

  passExercise(exerciseId, attempts) {
    this.passedExercises[exerciseId] = { passedAt: new Date().toISOString(), attempts };
  }

  prune(validLessonIds) {
    const valid = new Set(validLessonIds);
    this.completedLessonIds = new Set([...this.completedLessonIds].filter(id => valid.has(id)));
    if (this.lastLessonId && !valid.has(this.lastLessonId)) this.lastLessonId = null;
  }

  isCompleted(lessonId) {
    return this.completedLessonIds.has(lessonId);
  }

  percentage(total) {
    return total > 0 ? Math.round((this.completedLessonIds.size / total) * 100) : 0;
  }

  toJSON() {
    return {
      lastLessonId: this.lastLessonId,
      highestLessonPosition: this.highestLessonPosition,
      completedLessonIds: [...this.completedLessonIds],
      passedExercises: this.passedExercises,
      lastVisitedAt: this.lastVisitedAt,
    };
  }
}
