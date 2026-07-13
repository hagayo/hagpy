---
id: 9
slug: first-html-site
title: בניית אתר מקומי
intro: יוצרים index.html בתוך הפרויקט וצופים בו דרך שרת HTTP מקומי.
layout: legacy-installation
---

:::explanation title="הרעיון המרכזי"
יוצרים index.html בתוך הפרויקט וצופים בו דרך שרת HTTP מקומי.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
New file: index.html
uv run python -m http.server 8000
Open http://localhost:8000
```
:::

:::checklist title="נקודות חשובות"
- index.html נמצא בשורש הפרויקט
- צופים באתר דרך שרת HTTP מקומי
- בודקים את העמוד לפני Commit
:::
