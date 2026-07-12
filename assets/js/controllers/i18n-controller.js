export class I18nController {
  constructor(i18nService, preferencesService, eventBus, documentRef = document) {
    this.i18n = i18nService;
    this.preferencesService = preferencesService;
    this.eventBus = eventBus;
    this.document = documentRef;
    this.preferences = preferencesService.load();
  }

  async initialize() {
    await this.i18n.initialize(this.preferences.language);
    this.i18n.apply(this.document);
    this.#updateLanguageButton();
    this.document.querySelector('[data-action="language"]')
      ?.addEventListener('click', () => this.toggle());
  }

  async toggle() {
    const button = this.document.querySelector('[data-action="language"]');
    if (button) button.disabled = true;
    try {
      const locale = this.i18n.nextLocale();
      await this.i18n.setLocale(locale);
      this.preferences = this.preferences.withLanguage(locale);
      this.preferencesService.save(this.preferences);
      this.i18n.apply(this.document);
      this.#updateLanguageButton();
      this.eventBus.emit('locale:changed', { locale });
    } catch (error) {
      console.error('Could not change language', error);
      this.#showError();
    } finally {
      if (button) button.disabled = false;
    }
  }

  #updateLanguageButton() {
    const button = this.document.querySelector('[data-action="language"]');
    if (!button) return;
    const next = this.i18n.manifest.locales[this.i18n.nextLocale()];
    button.textContent = next.shortLabel;
    button.setAttribute('aria-label', this.i18n.t('ui.language.switchTo', { language: next.label }));
  }

  #showError() {
    const toast = this.document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = this.i18n.t('ui.language.loadError');
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2500);
  }
}
