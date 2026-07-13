export class SearchService {
  constructor(items) {
    this.items = Array.isArray(items) ? items : [];
  }

  search(query, translate, locale) {
    const term = String(query ?? '').trim().toLocaleLowerCase(locale);
    if (!term) return this.items;
    return this.items.filter(item => (
      String(translate(item.titleKey) ?? '').toLocaleLowerCase(locale).includes(term)
    ));
  }
}
