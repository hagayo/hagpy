---
id: 37
slug: pydantic-models
title: מודלים ב-Pydantic
intro: מאמתים קלט לא אמין בגבולות המערכת.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מאמתים קלט לא אמין בגבולות המערכת.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
```
:::

:::checklist title="נקודות חשובות"
- מודלים הם חוזים בגבולות
- הפרידו סכמות ליצירה, עדכון וקריאה
- אל תחשפו שדות סודיים
:::
