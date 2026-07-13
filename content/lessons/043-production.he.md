---
id: 43
slug: production
title: מוכנות לפרודקשן
intro: משלבים הגדרות, אבטחה, לוגים, Health Checks והפצה ניתנת לשחזור.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משלבים הגדרות, אבטחה, לוגים, Health Checks והפצה ניתנת לשחזור.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
GET /health/live
GET /health/ready

LOG_LEVEL=INFO
DATABASE_URL=<secret>
```
:::

:::checklist title="נקודות חשובות"
- הפרידו Liveness מ-Readiness
- אמתו הגדרות בעלייה
- הפיצו Artifacts קבועים וניתנים לשחזור
:::
