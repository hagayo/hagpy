import assert from 'node:assert/strict';
import test from 'node:test';
import { I18nController } from '../assets/js/controllers/i18n-controller.js';
import { UserPreferences } from '../assets/js/models/user-preferences.js';

test('language button switches locale without reloading the page', async () => {
  const button = {
    disabled: false,
    attributes: {},
    addEventListener(event, listener) { this.listener = listener; },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const documentRef = { querySelector: () => button };
  const i18n = {
    locale: 'en',
    manifest: { locales: {
      en: { label: 'English', shortLabel: 'EN' },
      he: { label: 'עברית', shortLabel: 'עב' },
    } },
    async initialize(locale) { this.locale = locale; },
    async setLocale(locale) { this.locale = locale; },
    nextLocale() { return this.locale === 'en' ? 'he' : 'en'; },
    apply() {},
    t(key, parameters) { return key === 'ui.language.switchTo' ? `Switch to ${parameters.language}` : key; },
  };
  let saved;
  let event;
  const preferencesService = {
    load: () => new UserPreferences({ language: 'en' }),
    save: preferences => { saved = preferences; },
  };
  const eventBus = { emit: (name, payload) => { event = { name, payload }; } };
  const controller = new I18nController(i18n, preferencesService, eventBus, documentRef);
  await controller.initialize();
  await button.listener();
  assert.equal(i18n.locale, 'he');
  assert.equal(saved.language, 'he');
  assert.deepEqual(event, { name: 'locale:changed', payload: { locale: 'he' } });
  assert.equal(button.textContent, 'EN');
  assert.equal(button.disabled, false);
});
