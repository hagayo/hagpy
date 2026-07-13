---
id: 40
slug: fastapi-routes
title: נתיבים ותלויות ב-FastAPI
intro: מתרגמים HTTP לקריאות ממוקדות למערכת.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מתרגמים HTTP לקריאות ממוקדות למערכת.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
@router.post("/users", response_model=UserRead, status_code=201)
def create_user(payload: UserCreate, service: UserService = Depends(get_service)):
    return service.create(payload)
```
:::

:::checklist title="נקודות חשובות"
- נתיבים צריכים להישאר דקים
- תלויות הן שותפים מפורשים
- מודלי פלט מגינים על החוזה
:::
