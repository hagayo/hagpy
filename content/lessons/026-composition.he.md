---
id: 26
slug: composition
title: הרכבה וירושה
intro: מעדיפים שיתוף פעולה בין אובייקטים קטנים על עצי ירושה עמוקים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מעדיפים שיתוף פעולה בין אובייקטים קטנים על עצי ירושה עמוקים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class OrderService:
    def __init__(self, repository: OrderRepository) -> None:
        self._repository = repository
```
:::

:::checklist title="נקודות חשובות"
- הרכבה חושפת תלויות
- הורישו רק כשיש תחליפיות אמיתית
- הזריקו שותפים דרך הבנאי
:::
