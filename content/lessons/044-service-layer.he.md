---
id: 44
slug: service-layer
title: שכבת Service
intro: מעבירים תרחישים עסקיים מנתיבי HTTP ושומרים אותם ניתנים לבדיקה.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
מעבירים תרחישים עסקיים מנתיבי HTTP ושומרים אותם ניתנים לבדיקה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class DreamService:
    def create(self, command): ...
```
:::

:::checklist title="נקודות חשובות"
- נתיבים מתרגמים HTTP
- Services מנהלים תרחישים
- Repositories מנהלים שמירה
:::
