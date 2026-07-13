---
id: 67
slug: pytest-index
title: אינדקס pytest
intro: מריצים בדיקות ממוקדות, Markers, כשלים, Coverage ודיבוג בלי לנחש Flags.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מריצים בדיקות ממוקדות, Markers, כשלים, Coverage ודיבוג בלי לנחש Flags.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
uv run pytest
uv run pytest tests/test_users.py
uv run pytest -k "create_user"
uv run pytest -x --pdb
uv run pytest --cov=src --cov-branch
```
:::

:::checklist title="נקודות חשובות"
- מתחילים מהיקף הבדיקה הצר והשימושי
- משתמשים בפלט מפורט בזמן אבחון
- שומרים אפשרויות קבועות ב-pyproject.toml
:::
