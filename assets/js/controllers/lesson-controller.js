export class LessonController {
  constructor(i18n) {
    this.i18n = i18n;
  }

  initialize() {
    document.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', () => this.copy(button));
    });
  }

  async copy(button) {
    const code = button.closest('.code-example')?.querySelector('code')?.textContent;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      this.toast(this.i18n.t('ui.copySuccess'));
    } catch (error) {
      console.error('Cannot copy code', error);
      this.toast(this.i18n.t('ui.copyFailure'));
    }
  }

  toast(message) {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1800);
  }
}
