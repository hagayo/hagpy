---
id: 19
slug: functions
title: פונקציות
intro: יוצרים יחידות קטנות עם קלט, פלט ואחריות אחת.
layout: legacy-reference
---

:::explanation title="הרעיון המרכזי"
יוצרים יחידות קטנות עם קלט, פלט ואחריות אחת.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
def calculate_total(price: float, quantity: int) -> float:
    return price * quantity
```
:::

:::checklist title="נקודות חשובות"
- העדיפו ערך מוחזר על print
- שמרו על פרמטרים משמעותיים
- פונקציה אחת עונה על שאלה אחת
:::
