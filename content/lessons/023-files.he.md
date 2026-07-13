---
id: 23
slug: files
title: קבצים ונתיבים
intro: קוראים וכותבים קבצים בבטחה עם pathlib ו-context managers.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
קוראים וכותבים קבצים בבטחה עם pathlib ו-context managers.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
from pathlib import Path

text = Path("README.md").read_text(encoding="utf-8")
```
:::

:::checklist title="נקודות חשובות"
- השתמשו ב-pathlib במקום מפרידים ידניים
- ציינו קידוד טקסט
- התייחסו לקלט ופלט כגבול כשל
:::
