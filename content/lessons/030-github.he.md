---
id: 30
slug: github
title: GitHub ו-Pull Requests
intro: משתמשים בשיתוף מרוחק כגבול לביקורת ואוטומציה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משתמשים בשיתוף מרוחק כגבול לביקורת ואוטומציה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
git remote add origin https://github.com/org/project.git
git push -u origin feature/user-api
```
:::

:::checklist title="נקודות חשובות"
- הסבירו למה השינוי קיים
- שמרו על PR בגודל שניתן לבדיקה
- הגנו על main וחייבו בדיקות
:::
