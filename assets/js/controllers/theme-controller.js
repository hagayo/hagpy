export class ThemeController {
  constructor(preferencesService, root = document.documentElement, documentRef = document) {
    this.preferencesService = preferencesService;
    this.root = root;
    this.document = documentRef;
    this.preferences = preferencesService.load();
  }

  initialize() {
    this.apply(this.preferences.theme);
    this.document.querySelector('[data-action="theme"]')
      ?.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const theme = this.preferences.theme === 'dark' ? 'light' : 'dark';
    this.preferences = this.preferences.withTheme(theme);
    this.preferencesService.save(this.preferences);
    this.apply(theme);
  }

  apply(theme) {
    this.root.dataset.theme = theme;
    const button = this.document.querySelector('[data-action="theme"]');
    if (!button) return;
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}
