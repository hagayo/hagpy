---
id: 5
slug: verify-installation
title: בדיקת ההתקנה
intro: מריצים רשימת בדיקה שמוכיחה כי Git, uv ו-Python זמינים.
layout: legacy-installation
---

:::explanation title="הרעיון המרכזי"
מריצים רשימת בדיקה שמוכיחה כי Git, uv ו-Python זמינים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
git --version
uv --version
uv run python --version
```
:::

:::checklist title="נקודות חשובות"
- כל פקודה צריכה להחזיר גרסה
- משתמשים בחלון PowerShell חדש
- פותרים בעיות PATH לפני שממשיכים
:::
