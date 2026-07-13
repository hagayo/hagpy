---
id: 18
slug: comprehensions
title: Comprehensions
intro: משנים אוספים בקיצור בלי להסתיר לוגיקה מורכבת.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משנים אוספים בקיצור בלי להסתיר לוגיקה מורכבת.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
passed = [score for score in scores if score >= 60]
by_id = {user.id: user for user in users}
```
:::

:::checklist title="נקודות חשובות"
- שמרו על טרנספורמציה אחת
- העדיפו לולאה כשהלוגיקה דורשת הסבר
- Generator חוסך יצירת רשימה מראש
:::
