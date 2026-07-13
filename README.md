# HagPy

HagPy is a static, bilingual learning platform for modern Python development, from the first local project to production-ready FastAPI services.

## Curriculum

The generated site contains 72 lessons across these tracks:

- Local setup, uv and terminal fundamentals
- A complete Windows 10/11 installation trail from Git and uv to a first live GitHub Pages website
- Python syntax, values, collections and control flow
- Functions, modules, exceptions and files
- Classes, dataclasses, composition, protocols and type hints
- Git and GitHub workflows
- pytest, fixtures, mocking, coverage, Ruff and Pylint
- Pydantic, REST and FastAPI architecture
- Service Layer, Repository Pattern, secrets and environment configuration
- Frontend integration with fetch, JSON, HTTP methods, validation errors and CORS
- MongoDB, PostgreSQL and Redis caching fundamentals
- Docker fundamentals and a uv-based FastAPI container
- CI/CD concepts and GitHub Actions
- GitHub Actions and production readiness

## Browser exercises

Selected Python, OOP, Pydantic and logical-testing lessons include a real browser editor powered by Pyodide in an isolated Web Worker. Each exercise provides starter code, Run, Reset, captured output, a time limit and automatic tests.

The first Python run downloads the Pyodide runtime from jsDelivr. Later runs use the browser cache. Topics that require uv, Git, GitHub, a listening FastAPI server or deployment remain local-project exercises because a browser simulation would teach the wrong workflow.

The static site does not require user accounts. A learner may enter a first name and keep minimal lesson and exercise progress in that browser's local storage. Nothing is sent to a server.

## Architecture

Browser behavior is separated into independent layers:

- `models/` contains state and business rules without DOM access.
- `services/` owns storage, search, internationalization and application operations.
- `controllers/` connects services to browser events and elements.
- `core/` contains generic infrastructure such as safe storage and events.
- `content/` is the single source of truth for the curriculum.
- `tools/build.js` generates the static lesson pages from that content.
- `assets/locales/` contains the runtime locale manifest and one JSON catalog per language.

Theme and language are independent controllers. Locale changes are applied without a page reload and without matching or replacing visible text. HTML and dynamic components reference semantic translation keys; translated values are loaded from JSON.

The browser has no framework or build dependency. The Node build script uses only built-in modules.

## Build

```bash
npm run build
npm test
```

## Run locally

From this directory:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

The dependency-free preview server can also be started with:

```bash
npm run preview
```

Before publishing, run `npm run test:e2e:serve` and open
`http://127.0.0.1:8000/e2e/` in a browser. The smoke test loads a real lesson
and verifies application startup, assets, curriculum navigation, translations,
language and theme switching, persistence, and LTR code rendering.

Modules are loaded with native ES modules, so opening the HTML directly with a `file://` URL is not supported by every browser.

## Adding another language

See [`docs/internationalization.md`](docs/internationalization.md). The runtime only needs a new JSON catalog and one manifest entry. The contract tests reject missing keys before deployment.
