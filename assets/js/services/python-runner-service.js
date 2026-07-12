export class RunnerError extends Error {
  constructor(code, cause) {
    super(code, { cause });
    this.name = 'RunnerError';
    this.code = code;
  }
}

export class PythonRunnerService {
  constructor(workerUrl = new URL('../workers/python-worker.js', import.meta.url), timeoutMs = 5000) {
    this.workerUrl = new URL(workerUrl, import.meta.url);
    this.timeoutMs = timeoutMs;
    this.worker = null;
    this.pending = null;
  }

  run(exercise, code) {
    this.cancel();
    this.worker = new Worker(this.workerUrl);
    return new Promise((resolve, reject) => {
      let runTimer;
      const loadTimer = window.setTimeout(() => {
        this.cancel(false);
        reject(new RunnerError('runtimeLoad'));
      }, 30000);
      this.pending = { reject };
      this.worker.onmessage = ({ data }) => {
        if (data.type === 'booting') return;
        if (!runTimer) {
          runTimer = window.setTimeout(() => {
            this.cancel(false);
            reject(new RunnerError('timeout'));
          }, this.timeoutMs);
        }
        if (data.type !== 'result' && data.type !== 'error') return;
        window.clearTimeout(loadTimer);
        window.clearTimeout(runTimer);
        this.pending = null;
        if (data.type === 'result') resolve(data);
        else reject(new Error(data.error));
        this.cancel(false);
      };
      this.worker.onerror = event => {
        window.clearTimeout(loadTimer);
        window.clearTimeout(runTimer);
        this.pending = null;
        reject(new RunnerError('worker', event.error));
        this.cancel(false);
      };
      this.worker.postMessage({ type: 'run', code, tests: exercise.tests, packages: exercise.packages });
    });
  }

  cancel(rejectPending = true) {
    if (rejectPending && this.pending) this.pending.reject(new RunnerError('cancelled'));
    this.pending = null;
    this.worker?.terminate();
    this.worker = null;
  }
}
