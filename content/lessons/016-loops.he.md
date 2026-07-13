---
id: 16
slug: loops
title: לולאות ואיטרציה
intro: מעבדים אוספים עם for, range ו-enumerate.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מעבדים אוספים עם for, range ו-enumerate.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
for index, topic in enumerate(topics, start=1):
    print(index, topic)
```
:::

:::checklist title="נקודות חשובות"
- עברו על ערכים, לא על אינדקסים
- השתמשו ב-enumerate כשצריך מיקום
- השתמשו ב-break וב-continue במידה
:::
