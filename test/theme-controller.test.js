import assert from 'node:assert/strict';
import test from 'node:test';
import { UserPreferences } from '../assets/js/models/user-preferences.js';

globalThis.document ??= { documentElement: {} };
const { ThemeController } = await import('../assets/js/controllers/theme-controller.js');

test('theme button toggles the DOM and persists the preference', () => {
  const button = {
    attributes: {},
    addEventListener(event, listener) { this.listener = listener; },
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const documentRef = { querySelector: () => button };
  const root = { dataset: {} };
  let saved;
  const service = {
    load: () => new UserPreferences({ theme: 'light', language: 'en' }),
    save: preferences => { saved = preferences; },
  };
  const controller = new ThemeController(service, root, documentRef);
  controller.initialize();
  assert.equal(root.dataset.theme, 'light');
  button.listener();
  assert.equal(root.dataset.theme, 'dark');
  assert.equal(button.attributes['aria-pressed'], 'true');
  assert.equal(saved.theme, 'dark');
});
