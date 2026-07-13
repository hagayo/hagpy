---
id: 52
slug: http-status-codes
title: קודי סטטוס HTTP
intro: קוראים קודי סטטוס כחלק מחוזה ה-API ולא כמספרים לקישוט.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
קוראים קודי סטטוס כחלק מחוזה ה-API ולא כמספרים לקישוט.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
200 201 204 400 401 403 404 409 422 500
```
:::

:::checklist title="נקודות חשובות"
- 2xx מציין הצלחה
- 4xx מתאר בעיית בקשה
- 5xx מתאר כשל שרת
:::
