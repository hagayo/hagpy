---
id: 69
slug: troubleshooting
title: פתרון תקלות
intro: מאבחנים סביבה, Imports, תלויות, בדיקות ועליית שרת בתהליך שניתן לשחזור.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מאבחנים סביבה, Imports, תלויות, בדיקות ועליית שרת בתהליך שניתן לשחזור.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
uv run python --version
uv sync
uv run python -c "import sys; print(sys.executable)"
uv run pytest -x -vv
uv run fastapi dev src/app/main.py
```
:::

:::checklist title="נקודות חשובות"
- משחזרים את הפקודה הקטנה ביותר שנכשלת
- קוראים את השגיאה המלאה ואת שרשרת הסיבות
- מתעדים מידע על הסביבה והגרסאות
:::
