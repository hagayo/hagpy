---
id: 39
slug: rest
title: תכנון REST ו-HTTP
intro: מתכננים חוזי משאבים יציבים עם מתודות וקודי סטטוס משמעותיים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מתכננים חוזי משאבים יציבים עם מתודות וקודי סטטוס משמעותיים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
GET /users/{id}       200 | 404
POST /users           201 | 422
DELETE /users/{id}    204 | 404
```
:::

:::checklist title="נקודות חשובות"
- כתובות מזהות משאבים
- מתודות מבטאות כוונה
- שגיאות צריכות מבנה תגובה יציב
:::
