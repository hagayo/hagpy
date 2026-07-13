---
id: 65
slug: uv-command-index
title: אינדקס פקודות uv
intro: משתמשים באינדקס לפי משימות לפרויקטים, גרסאות Python, תלויות, Lockfiles והרצה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משתמשים באינדקס לפי משימות לפרויקטים, גרסאות Python, תלויות, Lockfiles והרצה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
uv init my-project
uv python install 3.12
uv add fastapi
uv add --dev pytest ruff
uv lock
uv sync --frozen
uv run pytest
```
:::

:::checklist title="נקודות חשובות"
- מסבירים מה כל פקודה משנה
- מפרידים פיתוח מקומי מפקודות CI
- כוללים תהליכי שדרוג והסרה בטוחים
:::
