---
id: 50
slug: http-crud-methods
title: שליחת GET, ‏POST, ‏PATCH ו-DELETE
intro: בוחרים את מתודת HTTP שמתאימה לכוונה ולתגובה.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
בוחרים את מתודת HTTP שמתאימה לכוונה ולתגובה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
GET /api/dreams
POST /api/dreams
PATCH /api/dreams/{id}
DELETE /api/dreams/{id}
```
:::

:::checklist title="נקודות חשובות"
- GET קורא
- POST יוצר
- PATCH משנה שדות נבחרים
:::
