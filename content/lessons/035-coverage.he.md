---
id: 35
slug: coverage
title: כיסוי וסיכון חסר
intro: משתמשים בכיסוי כדי למצוא סיכון שלא הורץ, לא כדי לייצר ציון מושלם.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משתמשים בכיסוי כדי למצוא סיכון שלא הורץ, לא כדי לייצר ציון מושלם.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
uv run pytest --cov=src --cov-branch --cov-report=term-missing
```
:::

:::checklist title="נקודות חשובות"
- כיסוי ענפים חושף החלטות שלא נבדקו
- כיסוי אינו שופט Assertions
- קבעו סף לפי סיכון הפרויקט
:::
