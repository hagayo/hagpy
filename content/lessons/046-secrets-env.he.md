---
id: 46
slug: secrets-env
title: Secrets, ‏API Keys וקובצי ‎.env
intro: שומרים Credentials מחוץ לקוד ומחוץ להיסטוריית Git.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
שומרים Credentials מחוץ לקוד ומחוץ להיסטוריית Git.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
API_KEY=replace-me
DATABASE_URL=postgresql://...
```
:::

:::checklist title="נקודות חשובות"
- Secrets הם הגדרות
- שומרים ‎.env.example ולא ‎.env
- מאמתים הגדרות בעלייה
:::
