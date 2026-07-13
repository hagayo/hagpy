export class CurriculumService {
  constructor({ baseUrl = new URL('../data/', import.meta.url), fetcher = window.fetch.bind(window) } = {}) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher;
    this.curriculum = null;
  }

  async load() {
    if (this.curriculum) return this.curriculum;
    const response = await this.fetcher(new URL('curriculum.json', this.baseUrl));
    if (!response.ok) throw new Error(`Cannot load curriculum manifest: ${response.status}`);
    this.curriculum = await response.json();
    return this.curriculum;
  }
}
