---
id: 24
slug: classes
title: מחלקות ואובייקטים
intro: משתמשים במחלקות כאשר מצב והתנהגות שייכים יחד.
layout: legacy-reference
---

:::explanation title="הרעיון המרכזי"
משתמשים במחלקות כאשר מצב והתנהגות שייכים יחד.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class Account:
    def __init__(self, balance: int = 0) -> None:
        self._balance = balance

    def deposit(self, amount: int) -> None:
        self._balance += amount
```
:::

:::checklist title="נקודות חשובות"
- אובייקטים מגינים על מצב תקין
- מתודות מבטאות התנהגות עסקית
- אל תיצרו מחלקות כמיכל לפונקציות
:::
