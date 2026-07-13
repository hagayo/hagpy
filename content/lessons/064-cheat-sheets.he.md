---
id: 64
slug: cheat-sheets
title: דפי עזר מהירים
intro: שומרים את תחביר Python ואת פקודות הפרויקט השימושיות במרחק לחיצה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
שומרים את תחביר Python ואת פקודות הפרויקט השימושיות במרחק לחיצה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
value = items[0] if items else None
unique = set(values)
by_id = {item.id: item for item in items}
with Path("data.txt").open(encoding="utf-8") as file:
    text = file.read()
```
:::

:::checklist title="נקודות חשובות"
- מארגנים מידע לפי משימה
- מעדיפים תחביר תקני על טריקים
- מציגים ברירות מחדל בטוחות ליד כל פקודה
:::
