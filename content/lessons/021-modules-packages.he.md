---
id: 21
slug: modules-packages
title: מודולים וחבילות
intro: מחלקים קוד לפי אחריות וחושפים ממשק ציבורי קטן.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מחלקים קוד לפי אחריות וחושפים ממשק ציבורי קטן.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
from my_app.services.pricing import calculate_total

__all__ = ["calculate_total"]
```
:::

:::checklist title="נקודות חשובות"
- קובץ הוא מודול
- חבילה מאגדת מודולים קשורים
- מונעים ייבוא מעגלי באמצעות גבולות נכונים
:::
