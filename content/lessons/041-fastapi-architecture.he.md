---
id: 41
slug: fastapi-architecture
title: ארכיטקטורת FastAPI
intro: מפרידים תעבורה, תרחישי שימוש, חוקים עסקיים ושמירה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מפרידים תעבורה, תרחישי שימוש, חוקים עסקיים ושמירה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
Router -> Service -> Repository Protocol -> Database
                 -> Domain Models
```
:::

:::checklist title="נקודות חשובות"
- קוד הפריימוורק נשאר בקצה
- Services מנהלים תרחישי שימוש
- Repositories מסתירים פרטי שמירה
:::
