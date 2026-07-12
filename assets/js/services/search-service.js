export class SearchService {
  constructor(items) {
    this.items = items;
  }

  search(query, translate, locale) {
    const term = query.trim().toLocaleLowerCase(locale);
    if (!term) return this.items;
    return this.items.filter(item => translate(item.titleKey).toLocaleLowerCase(locale).includes(term));
  }
}
