---
id: 54
slug: same-origin-cors
title: Same Origin מול CORS
intro: מבינים מתי הדפדפן חוסם תגובה ומגדירים רק Origins מהימנים.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
מבינים מתי הדפדפן חוסם תגובה ומגדירים רק Origins מהימנים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
origin = scheme + host + port
```
:::

:::checklist title="נקודות חשובות"
- Same Origin אינו דורש CORS
- Ports שונים הם Origins שונים
- הדפדפן אוכף CORS
:::
