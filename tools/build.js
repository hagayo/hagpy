import { mkdir, writeFile } from 'node:fs/promises';
import { lessons, tracks } from '../content/curriculum.js';
import { exercises } from '../content/exercises.js';
import { installGuides } from '../content/install-guides.js';
import { productGuides } from '../content/product-guides.js';
import { referenceLessons } from '../content/reference-lessons.js';

const root = new URL('../', import.meta.url);
const pagesDirectory = new URL('pages/', root);
const localesDirectory = new URL('assets/locales/', root);
const catalogs = { en: Object.create(null), he: Object.create(null) };

await Promise.all([
  mkdir(pagesDirectory, { recursive: true }),
  mkdir(localesDirectory, { recursive: true }),
]);

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function register(key, en, he) {
  for (const [locale, value] of Object.entries({ en, he })) {
    const existing = catalogs[locale][key];
    if (existing !== undefined && existing !== value) {
      throw new Error(`Translation key ${key} was registered with conflicting values`);
    }
    catalogs[locale][key] = value;
  }
  return key;
}

function translated(key, en, he, tag = 'span', attributes = '') {
  register(key, en, he);
  return `<${tag}${attributes} data-i18n="${escapeHtml(key)}"></${tag}>`;
}

function translatedAttribute(key, en, he) {
  register(key, en, he);
  return escapeHtml(key);
}

const runtimeMessages = {
  'ui.language.switchTo': ['Switch to {language}', 'מעבר לשפה: {language}'],
  'ui.language.loadError': ['The selected language could not be loaded.', 'לא ניתן היה לטעון את השפה שנבחרה.'],
  'ui.copySuccess': ['Code copied', 'הקוד הועתק'],
  'ui.copyFailure': ['Copy failed', 'ההעתקה נכשלה'],
  'learner.validation.nameRequired': ['Please enter a name', 'נא להזין שם'],
  'learner.errors.profileSave': ['Could not save the profile', 'לא ניתן היה לשמור את הפרופיל'],
  'learner.lessonMarkedComplete': ['Lesson marked complete', 'השיעור סומן כהושלם'],
  'learner.exercisePassed': ['All tests passed. Lesson completed', 'כל הבדיקות עברו. השיעור הושלם'],
  'learner.resetConfirmation': ['Reset all local progress?', 'לאפס את כל ההתקדמות המקומית?'],
  'learner.progressReset': ['Progress reset', 'ההתקדמות אופסה'],
  'learner.localNotice': ['Progress is saved only in this browser. No registration is required and no data is sent to a server.', 'ההתקדמות נשמרת רק בדפדפן הזה. אין צורך בהרשמה ולא נשלח מידע לשרת.'],
  'learner.profile': ['Profile', 'פרופיל'],
  'learner.lessonCompleted': ['✓ Lesson completed', '✓ השיעור הושלם'],
  'learner.markComplete': ['Mark lesson complete', 'סיימתי את השיעור'],
  'learner.continueFrom': ['Continue from {lesson}', 'ממשיכים מ־{lesson}'],
  'learner.dialog.title': ['What should we call you?', 'איך לקרוא לך?'],
  'learner.dialog.description': ['Your name and progress will be stored only in this browser.', 'השם וההתקדמות יישמרו בדפדפן הזה בלבד.'],
  'learner.dialog.firstName': ['First name', 'שם פרטי'],
  'learner.dialog.save': ['Save', 'שמירה'],
  'learner.dialog.cancel': ['Cancel', 'ביטול'],
  'learner.dialog.reset': ['Reset progress', 'איפוס ההתקדמות'],
  'learner.localProgress': ['Your local progress', 'ההתקדמות המקומית שלך'],
  'exercise.ready': ['Ready to run.', 'מוכן להרצה.'],
  'exercise.loading': ['Loading Python and running…', 'טוען Python ומריץ…'],
  'exercise.noOutput': ['Code finished without output.', 'הקוד הסתיים ללא פלט.'],
  'exercise.errors.runtimeLoad': ['Python could not be loaded. Check the internet connection.', 'לא ניתן היה לטעון את Python. בדקו את החיבור לאינטרנט.'],
  'exercise.errors.timeout': ['The code stopped after exceeding the time limit.', 'הרצת הקוד נעצרה לאחר חריגה ממגבלת הזמן.'],
  'exercise.errors.worker': ['The Python runner failed to start.', 'מנגנון הרצת Python לא הצליח לעלות.'],
  'exercise.errors.cancelled': ['The run was cancelled.', 'ההרצה בוטלה.'],
};

for (const [key, [en, he]] of Object.entries(runtimeMessages)) register(key, en, he);

function documentHead(pageKey, titleEn, titleHe, assetPrefix = '../') {
  register(`${pageKey}.pageTitle`, `${titleEn} - HagPy`, `${titleHe} - HagPy`);
  register('meta.description', 'Professional Python learning path from zero to production', 'מסלול מקצועי ללימוד פייתון מאפס ועד פרודקשן');
  return `<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" data-i18n-content="meta.description" content=""><title data-i18n="${pageKey}.pageTitle"></title><link rel="icon" type="image/svg+xml" href="${assetPrefix}assets/images/hagpy-mark.svg"><link rel="stylesheet" href="${assetPrefix}assets/css/tokens.css"><link rel="stylesheet" href="${assetPrefix}assets/css/base.css"><link rel="stylesheet" href="${assetPrefix}assets/css/layout.css"><link rel="stylesheet" href="${assetPrefix}assets/css/components.css"><link rel="stylesheet" href="${assetPrefix}assets/css/rtl.css"></head>`;
}

function siteHeader(pathPrefix = '../') {
  const navItems = [
    ['installations', 'Installation', 'התקנות', 'windows-setup'],
    ['python', 'Python', 'פייתון', 'syntax'],
    ['workflow', 'Workflow', 'תהליך עבודה', 'uv'],
    ['testing', 'Testing & coverage', 'בדיקות וכיסוי קוד', 'pytest'],
    ['apis', 'APIs', 'ממשקים', 'rest'],
    ['cicd', 'CI/CD', 'CI/CD', 'cicd-overview'],
    ['cloud', 'Cloud deployment', 'פריסה לענן', 'production'],
  ];
  const links = navItems.map(([key, en, he, slug]) => translated(`ui.nav.${key}`, en, he, 'a', ` href="${pathPrefix}pages/${slug}.html"`)).join('');
  return `${translated('ui.skipToContent', 'Skip to content', 'דילוג לתוכן', 'a', ' class="skip-link" href="#content"')}<header class="site-header"><div class="container header-inner"><a class="brand" href="${pathPrefix}index.html"><span class="brand-mark">&gt;_</span>HagPy</a><button class="icon-button menu-button" data-action="menu" data-i18n-aria-label="${translatedAttribute('ui.menu', 'Menu', 'תפריט')}" aria-expanded="false">☰</button><nav class="top-nav" data-i18n-aria-label="${translatedAttribute('ui.primaryNavigation', 'Primary navigation', 'ניווט ראשי')}">${links}</nav><div class="header-actions"><button class="icon-button" data-action="theme" data-i18n-aria-label="${translatedAttribute('ui.theme.toggle', 'Toggle color theme', 'החלפת ערכת צבעים')}" aria-pressed="false">☾</button><button class="icon-button" data-action="language" data-i18n-aria-label="${translatedAttribute('ui.language.toggle', 'Change language', 'החלפת שפה')}">עב</button></div></div></header>`;
}

function sidebar(currentSlug) {
  return tracks.map(track => {
    const title = translated(`tracks.${track.id}.title`, track.en, track.he, 'h2', ' class="track-title"');
    const links = track.lessons.map(item => translated(
      `lessons.${item.slug}.title`, item.en, item.he, 'a',
      ` class="lesson-link${item.slug === currentSlug ? ' active' : ''}" data-lesson-slug="${item.slug}" href="${item.slug}.html"`,
    )).join('');
    return `<section data-track>${title}${links}</section>`;
  }).join('');
}

function codeBlock(code, filename = 'example.py') {
  return `<div class="code-example"><div class="code-title"><span>${escapeHtml(filename)}</span>${translated('ui.copy', 'Copy', 'העתקה', 'button', ' class="copy-code" data-copy')}</div><pre><code>${escapeHtml(code)}</code></pre></div>`;
}

function operatingSystemSelector() {
  return `<div class="os-selector" data-i18n-aria-label="${translatedAttribute('install.osSelector', 'Operating system', 'מערכת הפעלה')}"><button class="active" type="button">Windows 10/11</button><button type="button" disabled>macOS · Coming soon</button><button type="button" disabled>Linux · Coming soon</button></div>`;
}

function installationGuide(guide, slug) {
  const steps = guide.steps.map((step, index) => {
    const baseKey = `install.${slug}.steps.${index}`;
    const code = step.code ? codeBlock(step.code, step.code.includes('<!doctype') ? 'index.html' : 'PowerShell') : '';
    const link = step.link ? translated('install.officialLink', 'Open official page ↗', 'פתיחת העמוד הרשמי ↗', 'a', ` class="official-link" href="${step.link}" target="_blank" rel="noopener noreferrer"`) : '';
    return `<section class="installation-step"><div class="step-number">${String(index + 1).padStart(2, '0')}</div><div>${translated(`${baseKey}.title`, step.en, step.he, 'h2')}${translated(`${baseKey}.body`, step.bodyEn, step.bodyHe, 'p')}${code}${link}</div></section>`;
  }).join('');
  return `${operatingSystemSelector()}<section class="installation-intro">${translated(`install.${slug}.title`, guide.en, guide.he, 'h2')}${translated('install.followInOrder', 'Complete the steps in order. Do not continue when a verification command fails.', 'בצעו את השלבים לפי הסדר. אל תמשיכו כאשר פקודת בדיקה נכשלת.', 'p')}</section><div class="installation-steps">${steps}</div>`;
}

function deepProductGuide(guide, slug) {
  const sections = guide.sections.map((section, index) => {
    const key = `product.${slug}.sections.${index}`;
    return `<section class="deep-section"><div class="deep-section-number">${String(index + 1).padStart(2, '0')}</div><div class="deep-section-content">${translated(`${key}.title`, section.titleEn, section.titleHe, 'h2')}${translated(`${key}.body`, section.bodyEn, section.bodyHe, 'p')}${section.code ? codeBlock(section.code, section.filename) : ''}</div></section>`;
  }).join('');
  const mistakes = guide.mistakesEn.map((mistake, index) => translated(`product.${slug}.mistakes.${index}`, mistake, guide.mistakesHe[index], 'li')).join('');
  return `<section class="deep-intro">${translated('product.why', 'WHY THIS EXISTS', 'למה זה קיים', 'span', ' class="lesson-kicker"')}${translated(`product.${slug}.title`, guide.titleEn, guide.titleHe, 'h2')}${translated(`product.${slug}.intro`, guide.introEn, guide.introHe, 'p')}</section>${sections}<section class="deep-mistakes">${translated('product.commonMistakes', 'Common mistakes', 'טעויות נפוצות', 'h2')}<ul>${mistakes}</ul></section><section class="deep-exercise">${translated('product.checkUnderstanding', 'CHECK YOUR UNDERSTANDING', 'בדיקת הבנה', 'span', ' class="lesson-kicker"')}${translated('product.practiceProject', 'Practice in the project', 'תרגול בפרויקט', 'h2')}${translated(`product.${slug}.exercise`, guide.exerciseEn, guide.exerciseHe, 'p')}</section>`;
}

function exercisePanel(exercise, slug) {
  if (!exercise) {
    return `<div class="exercise">${translated('exercise.local.title', 'Practice in your local project', 'תרגול בפרויקט המקומי', 'h3')}${translated('exercise.local.body', 'Follow the lesson commands in the project you created with uv. This topic depends on the operating system, network, Git or a running server and is intentionally not simulated in the browser.', 'בצעו את פקודות השיעור בפרויקט שיצרתם עם uv. הנושא תלוי במערכת ההפעלה, ברשת, ב-Git או בשרת פועל ולכן אינו מדומה בדפדפן.', 'p')}</div>`;
  }
  return `<div class="code-lab"><div class="lab-heading"><div>${translated('exercise.try', 'TRY IT YOURSELF', 'נסו בעצמכם', 'span', ' class="lesson-kicker"')}${translated(`exercises.${slug}.title`, exercise.en, exercise.he, 'h3')}${translated(`exercises.${slug}.instructions`, exercise.instructionsEn, exercise.instructionsHe, 'p')}</div>${translated('exercise.runtime', 'Python in browser', 'Python בדפדפן', 'span', ' class="runtime-badge"')}</div><div class="lab-editor"><div class="editor-toolbar"><span>main.py</span>${translated('exercise.reset', 'Reset', 'איפוס', 'button', ' data-reset-code')}</div><textarea data-code-editor spellcheck="false" data-i18n-aria-label="${translatedAttribute('exercise.editorLabel', 'Python code editor', 'עורך קוד פייתון')}"></textarea><div class="lab-actions">${translated('exercise.run', '▶ Run and test', '▶ הרצה ובדיקה', 'button', ' class="run-button" data-run-code')}${translated('exercise.localRuntime', 'Runs locally in your browser', 'רץ מקומית בדפדפן', 'span')}</div></div><div class="lab-results">${translated('exercise.output', 'Output', 'פלט', 'h4')}<pre data-code-output data-i18n="exercise.ready"></pre>${translated('exercise.tests', 'Automatic tests', 'בדיקות אוטומטיות', 'h4')}<ul data-test-results></ul></div></div>`;
}

function standardLesson(item) {
  const points = item.pointsEn.map((point, index) => translated(`lessons.${item.slug}.points.${index}`, point, item.pointsHe[index], 'li')).join('');
  const conceptCards = item.pointsEn.map((point, index) => `<div class="concept-card"><b>0${index + 1}</b>${translated(`lessons.${item.slug}.points.${index}`, point, item.pointsHe[index], 'p')}</div>`).join('');
  return `<section class="lesson-section">${translated('lesson.coreIdea', 'The core idea', 'הרעיון המרכזי', 'h2')}${translated(`lessons.${item.slug}.mentalModel`, `This lesson builds a precise mental model for ${item.en.toLowerCase()}. Learn the contract first, then practice the syntax.`, `השיעור בונה מודל מחשבתי מדויק עבור ${item.he}. קודם מבינים את החוזה, ואז מתרגלים את התחביר.`, 'p')}<div class="concept-grid">${conceptCards}</div></section><section class="lesson-section">${translated('lesson.workingExample', 'Working example', 'דוגמה מעשית', 'h2')}${translated('lesson.readExample', 'Read the example from top to bottom. Identify the input, the responsibility and the observable result before running it.', 'קראו את הדוגמה מלמעלה למטה. זהו את הקלט, האחריות והתוצאה הנצפית לפני ההרצה.', 'p')}${codeBlock(item.code)}<div class="callout">${translated('lesson.professionalHabit', 'Professional habit', 'הרגל מקצועי', 'b')}${translated(`lessons.${item.slug}.points.0`, item.pointsEn[0], item.pointsHe[0], 'p')}</div></section><section class="lesson-section">${translated('lesson.productionChecklist', 'Production checklist', 'רשימת בדיקה לפרודקשן', 'h2')}<ul class="practice-list">${points}${translated('lesson.explicitFailure', 'Make failure behavior explicit', 'הגדירו במפורש את התנהגות הכשל', 'li')}${translated('lesson.smallContract', 'Keep the public contract small', 'שמרו על חוזה ציבורי קטן', 'li')}${translated('lesson.focusedTest', 'Add a focused automated test', 'הוסיפו בדיקה אוטומטית ממוקדת', 'li')}</ul><div class="callout warning">${translated('lesson.commonMistake', 'Common mistake', 'טעות נפוצה', 'b')}${translated('lesson.commonMistakeBody', 'Copying syntax before understanding which responsibility the code owns. Working code is not enough if its boundaries are unclear.', 'העתקת תחביר לפני שמבינים איזו אחריות הקוד מנהל. קוד עובד אינו מספיק אם הגבולות שלו אינם ברורים.', 'p')}</div></section><section class="lesson-section">${translated('lesson.tryYourself', 'Try it yourself', 'תרגול עצמי', 'h2')}${exercisePanel(exercises[item.slug], item.slug)}</section>`;
}

function referenceLesson(item, index, guide) {
  const key = `reference.${item.slug}`;
  const tr = (suffix, value, tag = 'p', attributes = '') => translated(`${key}.${suffix}`, value.en, value.he, tag, attributes);
  const label = (suffix, en, he, tag = 'span') => translated(`reference.labels.${suffix}`, en, he, tag);
  const objectives = guide.objectives.map((objective, objectiveIndex) => tr(`objectives.${objectiveIndex}`, objective, 'li')).join('');
  const terms = guide.terms.map(([term, definition], termIndex) => `<div class="reference-term"><strong>${escapeHtml(term)}</strong>${tr(`terms.${termIndex}`, definition)}</div>`).join('');
  const steps = (section, sectionName) => section.lines.map((line, lineIndex) => tr(`${sectionName}.lines.${lineIndex}`, line, 'li')).join('');
  const mistakes = guide.mistakes.map((mistake, mistakeIndex) => tr(`mistakes.${mistakeIndex}`, mistake, 'li')).join('');
  const hints = guide.exercise.hints.map((hint, hintIndex) => `<details><summary>${label('hint', 'Hint', 'רמז', 'span')}</summary>${tr(`exercise.hints.${hintIndex}`, hint)}</details>`).join('');
  const summary = guide.summary.map((point, summaryIndex) => tr(`summary.${summaryIndex}`, point, 'li')).join('');
  const visual = guide.visual ? `<figure class="lesson-visual"><img src="${escapeHtml(guide.visual.src)}" alt="" data-i18n-alt="${translatedAttribute(`${key}.visual.alt`, guide.visual.alt.en, guide.visual.alt.he)}"><figcaption>${tr('visual.caption', guide.visual.caption, 'span')}</figcaption></figure>` : '';
  return `<section class="reference-objectives"><h2>${label('objectives', 'In this lesson', 'בשיעור הזה')}</h2><ul>${objectives}</ul></section><section class="reference-section"><h2>${label('plain', 'The basic idea', 'הסבר בסיסי')}</h2>${tr('plain', guide.plain)}${visual}</section><section class="reference-section"><h2>${label('basic', 'Example and walkthrough', 'דוגמה ופירוט')}</h2>${tr('basic.lead', guide.basic.lead)}${codeBlock(guide.basic.code)}<ol class="reference-steps">${steps(guide.basic, 'basic')}</ol><div class="reference-output"><h2>${label('output', 'Expected output', 'הפלט הצפוי')}</h2>${tr('basic.output', guide.basic.output)}</div></section><section class="reference-section reference-why"><h2>${label('why', 'Why this matters', 'למה זה חשוב')}</h2>${tr('why', guide.why)}</section><section class="reference-section"><h2>${label('practical', 'A practical second example', 'דוגמה מעשית נוספת')}</h2>${tr('practical.lead', guide.practical.lead)}${codeBlock(guide.practical.code)}<ol class="reference-steps">${steps(guide.practical, 'practical')}</ol><div class="reference-output"><h2>${label('output', 'Expected output', 'הפלט הצפוי')}</h2>${tr('practical.output', guide.practical.output)}</div></section><section class="reference-section"><h2>${label('try', 'Try a small change', 'נסו שינוי קטן')}</h2>${tr('try', guide.tryIt)}</section><section class="reference-section reference-mistakes"><h2>${label('mistakes', 'Common mistakes', 'טעויות נפוצות')}</h2><ul>${mistakes}</ul></section><section class="reference-section"><div class="reference-exercise"><h2>${label('exercise', 'Short exercise', 'תרגיל קצר')}</h2>${tr('exercise.prompt', guide.exercise.prompt)}${hints}<details><summary>${label('solution', 'Show a possible solution', 'הצגת פתרון אפשרי')}</summary>${codeBlock(guide.exercise.solution, 'solution.py')}</details></div></section><section class="reference-section"><div class="reference-summary"><h2>${label('summary', 'Summary', 'סיכום')}</h2><ul>${summary}</ul></div></section><section class="reference-section reference-terms-section"><h2>${label('terms', 'Concepts learned', 'מושגים שלמדנו')}</h2><div class="reference-terms">${terms}</div></section>`;
}

function lessonNavigation(index) {
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const previousLink = previous ? `<a href="${previous.slug}.html">${translated('ui.previous', 'Previous', 'הקודם', 'small')}<b>← ${translated(`lessons.${previous.slug}.title`, previous.en, previous.he)}</b></a>` : '<span></span>';
  const nextLink = next ? `<a href="${next.slug}.html">${translated('ui.next', 'Next', 'הבא', 'small')}<b>${translated(`lessons.${next.slug}.title`, next.en, next.he)} →</b></a>` : `<a href="../index.html">${translated('ui.finish', 'Finish', 'סיום', 'small')}<b>${translated('ui.learningPath', 'Learning path →', 'מסלול הלימוד ←')}</b></a>`;
  return `<nav class="lesson-navigation">${previousLink}${nextLink}</nav>`;
}

function exerciseConfig(exercise, slug) {
  if (!exercise) return null;
  return {
    id: exercise.id,
    starterCode: exercise.starterCode,
    packages: exercise.packages,
    tests: exercise.tests.map((test, index) => ({
      nameKey: register(`exercises.${slug}.tests.${index}`, test.en, test.he),
      code: test.code,
    })),
  };
}

function pageConfig(item) {
  return {
    slug: item.slug,
    totalLessons: lessons.length,
    exercise: exerciseConfig(exercises[item.slug], item.slug),
    lessons: lessons.map(lesson => ({ slug: lesson.slug, titleKey: `lessons.${lesson.slug}.title` })),
  };
}

function lessonPage(item, index) {
  const pageKey = `lessons.${item.slug}`;
  register(`${pageKey}.title`, item.en, item.he);
  register(`${pageKey}.intro`, item.introEn, item.introHe);
  const guide = installGuides[item.slug];
  const productGuide = productGuides[item.slug];
  const referenceGuide = referenceLessons[item.slug];
  const content = referenceGuide ? referenceLesson(item, index, referenceGuide) : guide ? installationGuide(guide, item.slug) : productGuide ? deepProductGuide(productGuide, item.slug) : standardLesson(item);
  const lessonType = referenceGuide ? translated(`reference.${item.slug}.duration`, `${referenceGuide.minutes} min`, `${referenceGuide.minutes} דקות`, 'span', ' class="pill"') : guide ? '<span class="pill">Windows 10/11</span>' : productGuide ? translated('lesson.deep', 'Deep lesson', 'שיעור מעמיק', 'span', ' class="pill"') : '<span class="pill">10–15 min</span>';
  const searchKey = translatedAttribute('ui.search.placeholder', 'Search lessons…', 'חיפוש שיעורים…');
  const config = JSON.stringify(pageConfig(item)).replaceAll('<', '\\u003c');
  return `${documentHead(pageKey, item.en, item.he)}<body>${siteHeader()}<div class="app-layout"><aside class="sidebar" data-i18n-aria-label="${translatedAttribute('ui.curriculum', 'Curriculum', 'תוכנית הלימודים')}"><input class="sidebar-search" data-search type="search" data-i18n-placeholder="${searchKey}">${sidebar(item.slug)}</aside><main id="content" class="main-content"><article class="lesson-shell"><div class="breadcrumbs"><a href="../index.html">HagPy</a> / ${translated(`tracks.${item.trackId}.title`, item.trackEn, item.trackHe)} / ${translated(`${pageKey}.title`, item.en, item.he)}</div><header class="lesson-header">${translated(`${pageKey}.position`, `Lesson ${index + 1} of ${lessons.length}`, `שיעור ${index + 1} מתוך ${lessons.length}`, 'div', ' class="lesson-kicker"')}${translated(`${pageKey}.title`, item.en, item.he, 'h1')}${translated(`${pageKey}.intro`, item.introEn, item.introHe, 'p')}<div class="lesson-meta">${lessonType}<button class="complete-button" data-complete-lesson type="button"></button></div></header>${content}${lessonNavigation(index)}</article><footer class="site-footer"><div class="container"><span>HagPy</span>${translated('ui.tagline', 'Python from zero to production', 'פייתון מאפס ועד פרודקשן')}</div></footer></main></div><div class="toast" role="status" aria-live="polite"></div><script id="page-config" type="application/json">${config}</script><script type="module" src="../assets/js/app.js?v=20260712"></script></body></html>`;
}

function homePage() {
  const config = JSON.stringify({
    slug: '', totalLessons: lessons.length,
    lessons: lessons.map(item => ({ slug: item.slug, titleKey: `lessons.${item.slug}.title` })),
  });
  const trackRows = tracks.map((track, index) => {
    const links = track.lessons.map(item => translated(`lessons.${item.slug}.title`, item.en, item.he, 'a', ` href="pages/${item.slug}.html"`)).join('');
    return `<section class="home-track"><span class="track-number">${String(index + 1).padStart(2, '0')}</span><div>${translated(`tracks.${track.id}.title`, track.en, track.he, 'h3')}<p>${links}</p></div>${translated(`home.track.${track.id}.count`, `${track.lessons.length} lessons`, `${track.lessons.length} שיעורים`, 'b')}</section>`;
  }).join('');
  return `${documentHead('home', 'Python from zero to production', 'פייתון מאפס ועד פרודקשן', '')}<body>${siteHeader('')}<main><section class="home-hero container"><div>${translated('home.kicker', 'MODERN PYTHON ENGINEERING', 'הנדסת פייתון מודרנית', 'p', ' class="lesson-kicker"')}<h1>${translated('home.title', 'Learn Python.', 'לומדים פייתון.')}<br>${translated('home.titleAccent', 'Build like a professional.', 'בונים כמו מקצוענים.', 'em')}</h1>${translated('home.intro', 'A complete, practical path from your first variable to tested FastAPI services and automated CI/CD. Every topic has its own lesson, example, mistakes and exercise.', 'מסלול מעשי ושלם מהמשתנה הראשון ועד שירותי FastAPI בדוקים ו-CI/CD אוטומטי. לכל נושא שיעור, דוגמה, טעויות ותרגול משלו.', 'p')}${translated('home.start', 'Start the Windows setup →', 'מתחילים בהתקנת Windows ←', 'a', ' class="start-button" href="pages/windows-setup.html"')}</div><div class="hero-code"><b>production-ready.py</b><pre>uv sync --frozen\nruff check .\npylint src\npytest --cov\nfastapi run</pre></div></section><section class="home-path container"><div class="home-heading"><div>${translated('home.lessonCount', `${lessons.length} FOCUSED LESSONS`, `${lessons.length} שיעורים ממוקדים`, 'span', ' class="lesson-kicker"')}${translated('home.pathTitle', 'From setup to production', 'מהתקנה ועד פרודקשן', 'h2')}</div>${translated('home.pathIntro', 'Follow the path in order or jump directly to the tool you need.', 'התקדמו לפי הסדר או עברו ישירות לכלי שאתם צריכים.', 'p')}</div>${trackRows}</section></main><div class="toast" role="status" aria-live="polite"></div><script id="page-config" type="application/json">${config}</script><script type="module" src="assets/js/app.js?v=20260712"></script></body></html>`;
}

const pages = lessons.map((item, index) => writeFile(new URL(`${item.slug}.html`, pagesDirectory), lessonPage(item, index)));
await Promise.all([...pages, writeFile(new URL('index.html', root), homePage())]);

const enKeys = Object.keys(catalogs.en).sort();
const heKeys = Object.keys(catalogs.he).sort();
if (JSON.stringify(enKeys) !== JSON.stringify(heKeys)) throw new Error('Locale catalogs do not contain the same keys');

await Promise.all([
  writeFile(new URL('en.json', localesDirectory), `${JSON.stringify(catalogs.en, null, 2)}\n`),
  writeFile(new URL('he.json', localesDirectory), `${JSON.stringify(catalogs.he, null, 2)}\n`),
]);

console.log(`Built ${lessons.length} lesson pages and ${enKeys.length} translation keys.`);
