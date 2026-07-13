---
id: 25
slug: dataclasses
title: Dataclasses ואובייקטי ערך
intro: מייצגים מושגים עשירי מידע בלי קוד חזרתי.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מייצגים מושגים עשירי מידע בלי קוד חזרתי.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
@dataclass(frozen=True, slots=True)
class Money:
    amount: Decimal
    currency: str
```
:::

:::checklist title="נקודות חשובות"
- אובייקטי ערך קבועים קלים להבנה
- השתמשו ב-slots כשמתאים
- האימות עדיין מתבצע ביצירה
:::
