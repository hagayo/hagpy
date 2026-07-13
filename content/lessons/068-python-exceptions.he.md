---
id: 68
slug: python-exceptions
title: אינדקס חריגות Python
intro: מזהים חריגות מובנות נפוצות ומחליטים היכן מתאוששים, עוטפים או מדווחים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מזהים חריגות מובנות נפוצות ומחליטים היכן מתאוששים, עוטפים או מדווחים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
ValueError       Right type, invalid value
TypeError        Unsupported type or operation
KeyError         Missing dictionary key
FileNotFoundError Missing file path
TimeoutError     Operation exceeded its deadline
OSError          Operating-system or I/O failure
```
:::

:::checklist title="נקודות חשובות"
- תופסים את סוג החריגה הצר ביותר
- שומרים את הסיבה באמצעות raise from
- לעולם לא משתמשים ב-except כללי להסתרת כשל
:::
