---
id: 53
slug: pydantic-validation-errors
title: הצגת שגיאות Validation של Pydantic
intro: מתרגמים את פרטי 422 של FastAPI להודעות שימושיות ליד השדות.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
מתרגמים את פרטי 422 של FastAPI להודעות שימושיות ליד השדות.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
detail[0].loc → ["body", "title"]
```
:::

:::checklist title="נקודות חשובות"
- ל-422 יש פרטים מובנים
- ממפים מיקום לשדות בטופס
- לא מציגים JSON גולמי למשתמש
:::
