---
id: 58
slug: redis-cache
title: Redis כשכבת Cache
intro: משתמשים במידע זמני ומהיר להפחתת עבודה חוזרת מול המסד בלי להחליף אותו.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
משתמשים במידע זמני ומהיר להפחתת עבודה חוזרת מול המסד בלי להחליף אותו.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
cache-aside: GET → miss → DB → SETEX
```
:::

:::checklist title="נקודות חשובות"
- מידע ב-Cache עלול להיעלם
- TTL מונע מידע ישן לנצח
- Invalidation הוא החלק הקשה
:::
