---
id: 10
slug: push-first-repository
title: העלאת הפרויקט ל-GitHub
intro: מאתחלים Git מקומי, יוצרים Commit ראשון ומעלים את main ל-Repository הריק.
layout: legacy-installation
---

:::explanation title="הרעיון המרכזי"
מאתחלים Git מקומי, יוצרים Commit ראשון ומעלים את main ל-Repository הריק.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
git init
git add .
git commit -m "Create first website"
git branch -M main
git remote add origin https://github.com/USERNAME/hagpy-first-site.git
git push -u origin main
```
:::

:::checklist title="נקודות חשובות"
- בודקים git status לפני Commit
- מבצעים אימות בדפדפן כאשר מתבקשים
- מוודאים שהקבצים מופיעים ב-GitHub
:::
