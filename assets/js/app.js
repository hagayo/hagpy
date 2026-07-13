import { SafeStorage } from './core/storage.js';
import { EventBus } from './core/event-bus.js';
import { PreferencesService } from './services/preferences-service.js';
import { LearnerStorageService } from './services/learner-storage-service.js';
import { SearchService } from './services/search-service.js';
import { CurriculumService } from './services/curriculum-service.js';
import { PythonRunnerService } from './services/python-runner-service.js';
import { I18nService } from './services/i18n-service.js';
import { ThemeController } from './controllers/theme-controller.js';
import { I18nController } from './controllers/i18n-controller.js';
import { NavigationController } from './controllers/navigation-controller.js';
import { CurriculumController } from './controllers/curriculum-controller.js';
import { SearchController } from './controllers/search-controller.js';
import { LessonController } from './controllers/lesson-controller.js';
import { LearnerController } from './controllers/learner-controller.js?v=20260713';
import { CodeExerciseController } from './controllers/code-exercise-controller.js';

function readPageConfig() {
  try {
    return JSON.parse(document.querySelector('#page-config')?.textContent ?? '{}');
  } catch (error) {
    console.error('Invalid page configuration', error);
    return {};
  }
}

async function bootstrap() {
  const config = readPageConfig();
  const storage = new SafeStorage();
  const sessionStorage = new SafeStorage(window.sessionStorage);
  const events = new EventBus();
  const preferences = new PreferencesService(storage, events);
  const i18n = new I18nService();
  const curriculum = await new CurriculumService().load();

  new ThemeController(preferences).initialize();
  await new I18nController(i18n, preferences, events).initialize();
  new NavigationController().initialize();
  new CurriculumController(curriculum, config, i18n, events).initialize();
  new SearchController(new SearchService(curriculum.lessons ?? []), i18n, events).initialize();
  new LessonController(i18n).initialize();
  new LearnerController(
    new LearnerStorageService(storage, sessionStorage), events, { ...config, curriculum }, i18n,
  ).initialize();

  if (config.exercise) {
    new CodeExerciseController(
      new PythonRunnerService(),
      config.exercise,
      i18n,
      events,
    ).initialize();
  }
}

bootstrap().catch(error => {
  console.error('HagPy could not start', error);
  const toast = document.querySelector('.toast');
  if (toast) {
    toast.textContent = 'HagPy could not load. Please refresh the page.';
    toast.classList.add('show');
  }
});
