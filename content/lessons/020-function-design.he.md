---
id: 20
slug: function-design
title: תכנון פונקציות
intro: משתמשים בערכי ברירת מחדל, פרמטרים בשמות ופונקציות טהורות במכוון.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משתמשים בערכי ברירת מחדל, פרמטרים בשמות ופונקציות טהורות במכוון.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
def create_user(name: str, *, active: bool = True) -> User:
    return User(name=name, active=active)
```
:::

:::checklist title="נקודות חשובות"
- הימנעו מברירת מחדל משתנה
- השתמשו בפרמטרים בשם לבהירות
- הפרידו חישוב מתופעות לוואי
:::
