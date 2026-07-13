export class CurriculumController {
  constructor(curriculum, config, i18n, eventBus, documentRef = document) {
    this.curriculum = curriculum;
    this.config = config;
    this.i18n = i18n;
    this.eventBus = eventBus;
    this.document = documentRef;
    this.lessons = curriculum.lessons ?? [];
    this.lesson = this.lessons.find(item => item.id === config.lessonId) ?? null;
  }

  initialize() {
    this.#render();
    this.eventBus.on('locale:changed', () => this.#render());
  }

  #render() {
    this.#renderSidebar();
    this.#renderBreadcrumbs();
    this.#renderPosition();
    this.#renderLessonNavigation();
    this.i18n.apply(this.document);
  }

  #renderSidebar() {
    const container = this.document.querySelector('[data-curriculum-sidebar]');
    if (!container) return;

    container.innerHTML = this.curriculum.tracks.map(track => {
      const links = track.lessons.map(lessonId => {
        const lesson = this.lessons.find(item => item.id === lessonId);
        if (!lesson) return '';
        const active = lesson.id === this.config.lessonId ? ' active' : '';
        return `<a class="lesson-link${active}" data-lesson-id="${lesson.id}" href="${lesson.slug}.html" data-i18n="${lesson.titleKey}"></a>`;
      }).join('');
      return `<section data-track data-track-id="${track.id}"><h2 class="track-title" data-i18n="${track.titleKey}"></h2>${links}</section>`;
    }).join('');
  }

  #renderBreadcrumbs() {
    const container = this.document.querySelector('[data-breadcrumbs]');
    if (!container || !this.lesson) return;
    const track = this.curriculum.tracks.find(item => item.id === this.lesson.trackId);
    container.innerHTML = `<a href="../index.html">HagPy</a> / <span data-i18n="${track.titleKey}"></span> / <span data-i18n="${this.lesson.titleKey}"></span>`;
  }

  #renderPosition() {
    const element = this.document.querySelector('[data-lesson-position]');
    if (!element || !this.lesson) return;
    element.textContent = this.i18n.t('lesson.position', {
      current: this.lesson.position,
      total: this.lessons.length,
    });
  }

  #renderLessonNavigation() {
    const container = this.document.querySelector('[data-lesson-navigation]');
    if (!container || !this.lesson) return;

    const previous = this.lessons.find(item => item.position === this.lesson.position - 1);
    const next = this.lessons.find(item => item.position === this.lesson.position + 1);
    const previousLink = previous
      ? `<a href="${previous.slug}.html"><small data-i18n="ui.previous"></small><b>← <span data-i18n="${previous.titleKey}"></span></b></a>`
      : '<span></span>';
    const nextLink = next
      ? `<a href="${next.slug}.html"><small data-i18n="ui.next"></small><b><span data-i18n="${next.titleKey}"></span> →</b></a>`
      : `<a href="../index.html"><small data-i18n="ui.finish"></small><b data-i18n="ui.learningPath"></b></a>`;

    container.innerHTML = `${previousLink}${nextLink}`;
  }
}
