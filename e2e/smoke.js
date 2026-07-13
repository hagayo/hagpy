const frame = document.querySelector('#site');
const results = document.querySelector('#results');
const status = document.querySelector('#status');
const failures = [];

function record(name, passed, details = '') {
  const item = document.createElement('li');
  item.className = passed ? 'pass' : 'fail';
  item.textContent = `${passed ? 'PASS' : 'FAIL'} — ${name}${details ? `: ${details}` : ''}`;
  results.append(item);
  if (!passed) failures.push({ name, details });
}

async function waitFor(check, message, timeout = 6000) {
  const startedAt = performance.now();
  while (performance.now() - startedAt < timeout) {
    const value = check();
    if (value) return value;
    await new Promise(resolve => window.setTimeout(resolve, 25));
  }
  throw new Error(message);
}

async function responseFailures(urls) {
  const uniqueUrls = [...new Set(urls)];
  const responses = await Promise.all(uniqueUrls.map(async url => {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      return response.ok ? null : `${response.status} ${url}`;
    } catch (error) {
      return `${error.message} ${url}`;
    }
  }));
  return responses.filter(Boolean);
}

async function run() {
  localStorage.removeItem('hagpy.preferences');
  frame.src = '../pages/windows-setup.html?e2e=1';

  await waitFor(
    () => ['ready', 'error'].includes(frame.contentDocument?.documentElement.dataset.appStatus),
    'Application bootstrap did not finish',
  );

  const view = frame.contentWindow;
  const page = frame.contentDocument;
  const appStatus = page.documentElement.dataset.appStatus;
  record('application bootstrap', appStatus === 'ready', appStatus);

  const resourceUrls = view.performance.getEntriesByType('resource').map(entry => entry.name);
  const curriculumUrls = resourceUrls.filter(url => url.endsWith('/assets/data/curriculum.json'));
  record('curriculum manifest path', curriculumUrls.length === 1, curriculumUrls.join(', ') || 'not requested');
  record(
    'obsolete curriculum path is unused',
    !resourceUrls.some(url => url.includes('/assets/js/data/curriculum.json')),
  );

  const failedResources = await responseFailures(resourceUrls.filter(url => url.startsWith(location.origin)));
  record('all same-origin resources return successfully', failedResources.length === 0, failedResources.join('; '));

  const emptyTranslations = [...page.querySelectorAll('[data-i18n]')]
    .filter(element => !element.textContent.trim())
    .map(element => element.getAttribute('data-i18n'));
  record('translations render non-empty text', emptyTranslations.length === 0, emptyTranslations.join(', '));

  const manifestResponse = await fetch('../assets/data/curriculum.json', { cache: 'no-store' });
  const manifest = await manifestResponse.json();
  const currentLesson = manifest.lessons.find(lesson => lesson.id === 1);
  const previousLesson = manifest.lessons.find(lesson => lesson.position === currentLesson.position - 1);
  const nextLesson = manifest.lessons.find(lesson => lesson.position === currentLesson.position + 1);
  const navigationHrefs = [...page.querySelectorAll('[data-lesson-navigation] a')]
    .map(link => new URL(link.href).pathname);
  record(
    'previous and next links come from curriculum positions',
    navigationHrefs.some(path => path.endsWith(`/${previousLesson.slug}.html`))
      && navigationHrefs.some(path => path.endsWith(`/${nextLesson.slug}.html`)),
    navigationHrefs.join(', '),
  );
  record('breadcrumbs render', Boolean(page.querySelector('[data-breadcrumbs]')?.textContent.trim()));
  record('curriculum sidebar renders all lessons', page.querySelectorAll('[data-lesson-id]').length === manifest.lessons.length);

  const originalDocument = frame.contentDocument;
  const originalFrameUrl = frame.contentWindow.location.href;
  const originalLanguage = page.documentElement.lang;
  page.querySelector('[data-action="language"]').click();
  await waitFor(() => page.documentElement.lang !== originalLanguage, 'Language did not change');
  record(
    'language changes without reload',
    frame.contentDocument === originalDocument && frame.contentWindow.location.href === originalFrameUrl,
  );
  record('Hebrew switches the page to RTL', page.documentElement.lang === 'he' && page.documentElement.dir === 'rtl');
  page.querySelector('[data-action="language"]').click();
  await waitFor(() => page.documentElement.lang === originalLanguage, 'Language did not restore');

  const originalTheme = page.documentElement.dataset.theme;
  page.querySelector('[data-action="theme"]').click();
  await waitFor(() => page.documentElement.dataset.theme !== originalTheme, 'Theme did not change');
  const savedPreferences = JSON.parse(localStorage.getItem('hagpy.preferences'));
  record('theme changes and persists', savedPreferences.theme === page.documentElement.dataset.theme);
  page.querySelector('[data-action="theme"]').click();

  const codeDirections = [...page.querySelectorAll('pre, code')]
    .map(element => view.getComputedStyle(element).direction);
  record('code remains LTR', codeDirections.length > 0 && codeDirections.every(direction => direction === 'ltr'));

  status.textContent = failures.length === 0
    ? `Passed ${results.children.length} browser checks.`
    : `Failed ${failures.length} of ${results.children.length} browser checks.`;
  status.className = failures.length === 0 ? 'pass' : 'fail';
  document.documentElement.dataset.testStatus = failures.length === 0 ? 'passed' : 'failed';
  window.__HAGPY_E2E_RESULT__ = { failures, total: results.children.length };
}

run().catch(error => {
  record('test runner completed', false, error.message);
  status.textContent = 'Browser smoke test crashed.';
  status.className = 'fail';
  document.documentElement.dataset.testStatus = 'failed';
  window.__HAGPY_E2E_RESULT__ = { failures, error: error.message, total: results.children.length };
});
