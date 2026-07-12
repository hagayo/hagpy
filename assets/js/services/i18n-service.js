const ATTRIBUTE_BINDINGS = Object.freeze({
  'data-i18n-placeholder': 'placeholder',
  'data-i18n-aria-label': 'aria-label',
  'data-i18n-title': 'title',
  'data-i18n-content': 'content',
  'data-i18n-alt': 'alt',
});

const DEFAULT_LOCALES_URL = new URL('../../locales/', import.meta.url);

export class I18nService {
  constructor({ baseUrl = DEFAULT_LOCALES_URL, manifestUrl, fetcher = window.fetch.bind(window), logger = console } = {}) {
    this.baseUrl = new URL(baseUrl, import.meta.url);
    this.manifestUrl = manifestUrl
      ? new URL(manifestUrl, import.meta.url)
      : new URL('manifest.json', this.baseUrl);
    this.fetcher = fetcher;
    this.logger = logger;
    this.catalogs = new Map();
    this.manifest = null;
    this.locale = null;
  }

  async initialize(requestedLocale) {
    this.manifest = await this.#fetchJson(this.manifestUrl);
    const locale = this.supports(requestedLocale) ? requestedLocale : this.manifest.defaultLocale;
    await this.setLocale(locale);
  }

  supports(locale) {
    return Boolean(this.manifest?.locales?.[locale]);
  }

  get supportedLocales() {
    return Object.keys(this.manifest?.locales ?? {});
  }

  get localeDefinition() {
    return this.manifest?.locales?.[this.locale];
  }

  async setLocale(locale) {
    if (!this.supports(locale)) throw new RangeError(`Unsupported locale: ${locale}`);
    if (!this.catalogs.has(locale)) {
      const file = this.manifest.locales[locale].file;
      this.catalogs.set(locale, await this.#fetchJson(new URL(file, this.baseUrl)));
    }
    this.locale = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = this.localeDefinition.direction;
  }

  nextLocale() {
    const locales = this.supportedLocales;
    const currentIndex = locales.indexOf(this.locale);
    return locales[(currentIndex + 1) % locales.length];
  }

  t(key, parameters = {}) {
    const value = this.catalogs.get(this.locale)?.[key];
    if (typeof value !== 'string') {
      this.logger.error(`Missing translation: ${this.locale}.${key}`);
      return `[${key}]`;
    }
    return value.replace(/\{(\w+)\}/g, (match, name) => String(parameters[name] ?? match));
  }

  apply(root = document) {
    this.#matching(root, '[data-i18n]').forEach(element => {
      element.textContent = this.t(element.dataset.i18n);
    });
    for (const [selector, attribute] of Object.entries(ATTRIBUTE_BINDINGS)) {
      this.#matching(root, `[${selector}]`).forEach(element => {
        element.setAttribute(attribute, this.t(element.getAttribute(selector)));
      });
    }
  }

  #matching(root, selector) {
    const matches = [...root.querySelectorAll(selector)];
    if (root.matches?.(selector)) matches.unshift(root);
    return matches;
  }

  async #fetchJson(url) {
    const response = await this.fetcher(url);
    if (!response.ok) throw new Error(`Could not load ${url.pathname}: HTTP ${response.status}`);
    return response.json();
  }
}
