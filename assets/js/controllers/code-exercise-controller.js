import { CodeExercise } from '../models/code-exercise.js';

export class CodeExerciseController {
  constructor(service, config, i18n, eventBus) {
    this.service = service;
    this.exercise = new CodeExercise(config);
    this.i18n = i18n;
    this.eventBus = eventBus;
    this.attempts = 0;
    this.editor = document.querySelector('[data-code-editor]');
    this.output = document.querySelector('[data-code-output]');
    this.results = document.querySelector('[data-test-results]');
  }

  initialize() {
    if (!this.editor) return;
    this.editor.value = this.exercise.starterCode;
    document.querySelector('[data-run-code]')?.addEventListener('click', () => this.run());
    document.querySelector('[data-reset-code]')?.addEventListener('click', () => this.reset());
    this.eventBus.on('locale:changed', () => this.#translateIdleState());
  }

  async run() {
    const button = document.querySelector('[data-run-code]');
    button.disabled = true;
    this.attempts += 1;
    this.output.textContent = this.i18n.t('exercise.loading');
    this.results.replaceChildren();
    try {
      const exercise = {
        ...this.exercise,
        tests: this.exercise.tests.map(test => ({ ...test, name: this.i18n.t(test.nameKey) })),
      };
      const result = await this.service.run(exercise, this.editor.value);
      this.render(result);
    } catch (error) {
      console.error('Exercise run failed', error);
      this.output.textContent = error.code ? this.i18n.t(`exercise.errors.${error.code}`) : error.message;
      this.output.dataset.state = 'error';
    } finally {
      button.disabled = false;
    }
  }

  reset() {
    this.service.cancel();
    this.editor.value = this.exercise.starterCode;
    this.output.textContent = this.i18n.t('exercise.ready');
    this.output.dataset.state = '';
    this.results.replaceChildren();
  }

  render(result) {
    this.output.textContent = result.output || this.i18n.t('exercise.noOutput');
    this.output.dataset.state = 'success';
    for (const test of result.tests) {
      const item = document.createElement('li');
      item.className = test.passed ? 'passed' : 'failed';
      item.textContent = `${test.passed ? '✓' : '✗'} ${test.name}${test.error ? `: ${test.error.split('\n').at(-1)}` : ''}`;
      this.results.append(item);
    }
    if (result.tests.length > 0 && result.tests.every(test => test.passed)) {
      this.eventBus.emit('exercise:passed', { exerciseId: this.exercise.id, attempts: this.attempts });
    }
  }

  #translateIdleState() {
    if (!this.output.dataset.state) this.output.textContent = this.i18n.t('exercise.ready');
  }
}
