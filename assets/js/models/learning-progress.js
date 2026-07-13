export class LearningProgress {
  constructor({
    lastLessonId = null,
    lastLessonSlug = null,
    highestLessonPosition = null,
    highestLessonIndex = -1,
    completedLessonIds = [],
    completedLessons = [],
    passedExercises = {},
    lastVisitedAt = null,
  } = {}) {
    this.lastLessonId = Number.isInteger(lastLessonId) ? lastLessonId : null;
    this.lastLessonSlug = lastLessonSlug;
    const migratedPosition = Number.isInteger(highestLessonIndex) ? highestLessonIndex + 1 : 0;
    this.highestLessonPosition = Math.max(
      0,
      Number.isInteger(highestLessonPosition) ? highestLessonPosition : migratedPosition,
    );
    this.completedLessonIds = new Set(
      Array.isArray(completedLessonIds)
        ? completedLessonIds.filter(id => Number.isInteger(id) && id > 0)
        : [],
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
    if (!Number.isFinite(total) || total <= 0) return 0;
    return Math.min(100, Math.round((this.completedLessonIds.size / total) * 100));
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
