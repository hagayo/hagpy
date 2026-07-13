---
id: 3
slug: install-uv-python
title: התקנת uv ו-Python
intro: מתקינים uv, משתמשים בו להתקנת Python ונמנעים מסביבות גלובליות מתנגשות.
layout: legacy-installation
---

:::explanation title="הרעיון המרכזי"
מתקינים uv, משתמשים בו להתקנת Python ונמנעים מסביבות גלובליות מתנגשות.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uv python install 3.12
uv python list
```
:::

:::checklist title="נקודות חשובות"
- uv מנהל את Python ואת התלויות
- אין צורך ב-Installer נפרד ל-Python
- כל פרויקט מקבל סביבה מבודדת
:::
