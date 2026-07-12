# Internationalization architecture

HagPy uses key-based runtime internationalization. Pages never contain parallel English and Hebrew strings, and JavaScript never translates by matching complete visible text.

## Runtime files

- `assets/locales/manifest.json` declares the default locale and every supported locale.
- `assets/locales/en.json` contains English values.
- `assets/locales/he.json` contains Hebrew values.
- `assets/js/services/i18n-service.js` loads, caches, interpolates and applies catalogs.
- `assets/js/controllers/i18n-controller.js` owns the language control and persistence.
- `assets/js/controllers/theme-controller.js` independently owns the color theme.

The locale directory is resolved from `import.meta.url` inside `i18n-service.js`:

```js
const localesUrl = new URL('../../locales/', import.meta.url);
```

It therefore does not depend on `document.baseURI`, the current lesson depth, or a repository sub-path. Pages do not inject locale prefixes.

Static markup uses semantic keys:

```html
<h1 data-i18n="lessons.variables-types.title"></h1>
<input data-i18n-placeholder="ui.search.placeholder">
```

Dynamic JavaScript uses the same contract:

```js
toast.textContent = i18n.t('learner.progressReset');
```

## Add a locale

1. Copy `en.json` to a new catalog such as `de.json`.
2. Translate values without changing, adding or removing keys.
3. Add the locale to `manifest.json` with `file`, `direction`, `label` and `shortLabel`.
4. Run `npm test` to verify the catalog contract and every key referenced by generated HTML.

The language control reads the manifest, so the runtime does not contain an English/Hebrew conditional. It cycles through the supported locale entries and updates `html[lang]` and `html[dir]` without reloading the page.

## Build-time source

Curriculum content remains structured in `content/`. `tools/build.js` registers semantic keys while generating pages and writes both built-in catalogs. It fails immediately on conflicting values or unequal key sets. A production localization workflow can replace the generated catalogs with translated catalogs while keeping the HTML and JavaScript unchanged.
