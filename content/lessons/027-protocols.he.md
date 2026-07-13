---
id: 27
slug: protocols
title: Protocols וממשקים
intro: תלויים ביכולות ולא במימושים קונקרטיים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
תלויים ביכולות ולא במימושים קונקרטיים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class UserRepository(Protocol):
    def get(self, user_id: UUID) -> User | None: ...
```
:::

:::checklist title="נקודות חשובות"
- Protocols תומכים בטיפוס מבני
- ממשקים מגינים על גבולות ארכיטקטוניים
- שמרו על חוזים קטנים ומלוכדים
:::
