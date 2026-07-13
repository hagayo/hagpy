---
id: 38
slug: pydantic-validation
title: אימות והגדרות ב-Pydantic
intro: מבטאים חוקים בין שדות וטוענים הגדרות עם טיפוסים בבטחה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מבטאים חוקים בין שדות וטוענים הגדרות עם טיפוסים בבטחה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
class Settings(BaseSettings):
    database_url: SecretStr
    log_level: Literal["INFO", "DEBUG"] = "INFO"
```
:::

:::checklist title="נקודות חשובות"
- שמרו Validators צפויים
- השתמשו ב-pydantic-settings להגדרות סביבה
- לעולם אל תדפיסו ערכים סודיים
:::
