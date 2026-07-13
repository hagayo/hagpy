---
id: 62
slug: github-actions-cicd
title: CI/CD באמצעות GitHub Actions
intro: יוצרים Workflow שמתקין באמצעות uv, בודק איכות ומריץ בדיקות.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
יוצרים Workflow שמתקין באמצעות uv, בודק איכות ומריץ בדיקות.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
.github/workflows/ci.yml
```
:::

:::checklist title="נקודות חשובות"
- אירועים מפעילים Workflows
- Jobs רצים על Runners נקיים
- שלב שנכשל עוצר את ה-Job
:::
