---
id: 48
slug: fetch-api
title: העבודה עם fetch
intro: שולחים בקשות אסינכרוניות מהדפדפן ובודקים נכון את ה-Response.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
שולחים בקשות אסינכרוניות מהדפדפן ובודקים נכון את ה-Response.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
const response = await fetch("/api/dreams");
```
:::

:::checklist title="נקודות חשובות"
- fetch מחזיר Promise
- שגיאות HTTP לא זורקות אוטומטית
- קוראים את ה-Body פעם אחת
:::
