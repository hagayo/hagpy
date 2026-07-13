---
id: 45
slug: repository-pattern
title: Repository Pattern ומבנה שלד
intro: מסתירים את מנגנון השמירה מאחורי ממשק קטן שעליו ה-Service יכול להסתמך.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
מסתירים את מנגנון השמירה מאחורי ממשק קטן שעליו ה-Service יכול להסתמך.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class DreamRepository(Protocol):
    def save(self, dream): ...
```
:::

:::checklist title="נקודות חשובות"
- תלויים בחוזים
- משאירים שמירה מחוץ ללוגיקה
- מחליפים מימושים בבדיקות
:::
