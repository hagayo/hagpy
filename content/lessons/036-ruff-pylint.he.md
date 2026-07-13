---
id: 36
slug: ruff-pylint
title: Ruff ו-Pylint
intro: משלבים בדיקות אוטומטיות מהירות עם משוב תכנוני עמוק.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משלבים בדיקות אוטומטיות מהירות עם משוב תכנוני עמוק.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
uv run ruff check .
uv run ruff format --check .
uv run pylint src
```
:::

:::checklist title="נקודות חשובות"
- Ruff מטפל בבדיקות ועיצוב מהירים
- Pylint מספק אבחון עמוק יותר
- הגדירו כלים ב-pyproject.toml
:::
