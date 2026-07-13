export class CurriculumService {
  constructor({ baseUrl = new URL('../../data/', import.meta.url), fetcher = window.fetch.bind(window) } = {}) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher;
    this.curriculum = null;
    this.loadPromise = null;
  }

  async load() {
    if (this.curriculum) return this.curriculum;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      const response = await this.fetcher(new URL('curriculum.json', this.baseUrl));
      if (!response.ok) throw new Error(`Cannot load curriculum manifest: ${response.status}`);
      const curriculum = await response.json();
      if (!curriculum || !Array.isArray(curriculum.lessons) || !Array.isArray(curriculum.tracks)) {
        throw new TypeError('Invalid curriculum manifest');
      }
      this.curriculum = curriculum;
      return curriculum;
    })();

    try {
      return await this.loadPromise;
    } catch (error) {
      this.loadPromise = null;
      throw error;
    }
  }
}
