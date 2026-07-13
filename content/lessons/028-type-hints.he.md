---
id: 28
slug: type-hints
title: Type Hints
intro: הופכים חוזים לגלויים לבני אדם, לעורכים ולמנתחים סטטיים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
הופכים חוזים לגלויים לבני אדם, לעורכים ולמנתחים סטטיים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
def find_user(user_id: UUID) -> User | None:
    ...
```
:::

:::checklist title="נקודות חשובות"
- טיפוסים מתעדים ציפיות
- השתמשו באוספים ובאופציונליות מדויקים
- בדיקה סטטית משלימה אימות בזמן ריצה
:::
