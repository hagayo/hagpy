export class SearchController {
  constructor(service, i18n, eventBus) {
    this.service = service;
    this.i18n = i18n;
    this.eventBus = eventBus;
  }

  initialize() {
    this.input = document.querySelector('[data-search]');
    if (!this.input) return;
    this.input.addEventListener('input', () => this.search());
    this.eventBus.on('locale:changed', () => this.search());
  }

  search() {
    this.render(this.service.search(this.input.value, key => this.i18n.t(key), this.i18n.locale));
  }

  render(results) {
    const allowed = new Set(results.map(item => item.slug));
    document.querySelectorAll('[data-lesson-slug]').forEach(link => {
      link.hidden = !allowed.has(link.dataset.lessonSlug);
    });
    document.querySelectorAll('[data-track]').forEach(track => {
      track.hidden = ![...track.querySelectorAll('[data-lesson-slug]')].some(link => !link.hidden);
    });
  }
}
