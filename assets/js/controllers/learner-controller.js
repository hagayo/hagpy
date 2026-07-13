export class LearnerController {
  constructor(service, eventBus, config, i18n) {
    this.service = service;
    this.eventBus = eventBus;
    this.config = config;
    this.i18n = i18n;
    this.profile = service.loadProfile();
    this.progress = service.loadProgress();
  }

  initialize() {
    const lessons = this.config.curriculum.lessons ?? [];
    this.progress.migrateSlugs(lessons);
    this.progress.prune(lessons.map(item => item.id));
    this.#renderShell();
    this.#bind();
    if (this.config.lessonId) {
      const lesson = lessons.find(item => item.id === this.config.lessonId);
      this.progress.visit(this.config.lessonId, lesson?.position ?? 0);
      this.service.saveProgress(this.progress);
    }
    this.#render();
    if (!this.profile.isConfigured) this.#openDialog(true);
    else if (this.service.shouldShowLocalNotice()) this.#showLocalNotice();
    this.eventBus.on('exercise:passed', payload => this.#onExercisePassed(payload));
    this.eventBus.on('locale:changed', () => this.#render());
  }

  #bind() {
    document.querySelector('[data-profile-button]')?.addEventListener('click', () => this.#openDialog(false));
    document.querySelector('[data-profile-form]')?.addEventListener('submit', event => this.#saveProfile(event));
    document.querySelector('[data-profile-cancel]')?.addEventListener('click', () => document.querySelector('[data-profile-dialog]')?.close());
    document.querySelector('[data-reset-progress]')?.addEventListener('click', () => this.#resetProgress());
    document.querySelector('[data-complete-lesson]')?.addEventListener('click', () => this.#completeLesson());
  }

  #saveProfile(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.displayName;
    const name = input.value.trim();
    if (!name) {
      input.setCustomValidity(this.i18n.t('learner.validation.nameRequired'));
      input.reportValidity();
      return;
    }
    input.setCustomValidity('');
    this.profile = this.profile.withName(name);
    if (!this.service.saveProfile(this.profile)) {
      this.#toast(this.i18n.t('learner.errors.profileSave'));
      return;
    }
    document.querySelector('[data-profile-dialog]').close();
    this.#render();
    this.#showLocalNotice();
  }

  #completeLesson() {
    if (!this.config.lessonId) return;
    this.progress.completeLesson(this.config.lessonId);
    this.service.saveProgress(this.progress);
    this.#render();
    this.#toast(this.i18n.t('learner.lessonMarkedComplete'));
  }

  #onExercisePassed({ exerciseId, attempts }) {
    this.progress.passExercise(exerciseId, attempts);
    this.progress.completeLesson(this.config.lessonId);
    this.service.saveProgress(this.progress);
    this.#render();
    this.#toast(this.i18n.t('learner.exercisePassed'));
  }

  #resetProgress() {
    if (!window.confirm(this.i18n.t('learner.resetConfirmation'))) return;
    if (this.service.resetProgress()) {
      this.progress = this.service.loadProgress();
      this.#render();
      this.#toast(this.i18n.t('learner.progressReset'));
    }
  }

  #openDialog(firstVisit) {
    const dialog = document.querySelector('[data-profile-dialog]');
    dialog.querySelector('[data-profile-cancel]').hidden = firstVisit;
    dialog.querySelector('input').value = this.profile.displayName;
    dialog.showModal();
  }

  #showLocalNotice() {
    this.service.markLocalNoticeShown();
    this.#toast(this.i18n.t('learner.localNotice'), 3000);
  }

  #render() {
    const profileButton = document.querySelector('[data-profile-button]');
    if (profileButton) profileButton.textContent = this.profile.isConfigured ? this.profile.displayName : this.i18n.t('learner.profile');

    const completed = this.progress.completedLessons.size;
    document.querySelectorAll('[data-progress-count]').forEach(element => { element.textContent = String(completed); });
    document.querySelectorAll('[data-progress-percent]').forEach(element => { element.textContent = `${this.progress.percentage(this.config.totalLessons)}%`; });

    const completeButton = document.querySelector('[data-complete-lesson]');
    if (completeButton) {
      const done = this.progress.isCompleted(this.config.lessonId);
      completeButton.textContent = this.i18n.t(done ? 'learner.lessonCompleted' : 'learner.markComplete');
      completeButton.disabled = done;
    }

    const continueLink = document.querySelector('[data-continue-link]');
    if (continueLink && this.progress.lastLessonId) {
      const lesson = this.config.curriculum.lessons.find(item => item.id === this.progress.lastLessonId);
      continueLink.href = lesson ? `pages/${lesson.slug}.html` : '#';
      continueLink.hidden = false;
      continueLink.querySelector('b').textContent = this.i18n.t('learner.continueFrom', {
        lesson: lesson ? this.i18n.t(lesson.titleKey) : '',
      });
    }
  }

  #renderShell() {
    document.querySelector('.header-actions')?.insertAdjacentHTML('afterbegin', '<button class="profile-button" data-profile-button type="button"></button>');
    document.body.insertAdjacentHTML('beforeend', `<dialog class="profile-dialog" data-profile-dialog><form method="dialog" data-profile-form><span class="lesson-kicker">HagPy LOCAL PROFILE</span><h2 data-i18n="learner.dialog.title"></h2><p data-i18n="learner.dialog.description"></p><label><span data-i18n="learner.dialog.firstName"></span><input name="displayName" maxlength="40" autocomplete="given-name" required></label><div class="dialog-actions"><button class="run-button" type="submit" data-i18n="learner.dialog.save"></button><button type="button" data-profile-cancel data-i18n="learner.dialog.cancel"></button></div><hr><button class="danger-button" type="button" data-reset-progress data-i18n="learner.dialog.reset"></button></form></dialog>`);
    if (!this.config.slug && document.querySelector('main')) {
      document.querySelector('main').insertAdjacentHTML('afterbegin', `<section class="continue-card container"><div><span data-i18n="learner.localProgress"></span><strong><span data-progress-count>0</span> / ${this.config.totalLessons}</strong><small data-progress-percent>0%</small></div><a data-continue-link hidden href="#"><b></b><span>→</span></a></section>`);
    }
    this.i18n.apply(document);
  }

  #toast(message, duration = 1800) {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => toast.classList.remove('show'), duration);
  }
}
