---
id: 15
slug: conditions
title: תנאים
intro: מבטאים החלטות באמצעות חוקים בוליאניים קטנים וקריאים.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מבטאים החלטות באמצעות חוקים בוליאניים קטנים וקריאים.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
if score >= 90:
    grade = "excellent"
elif score >= 70:
    grade = "good"
else:
    grade = "practice"
```
:::

:::checklist title="נקודות חשובות"
- השתמשו ב-Truthiness במכוון
- הימנעו מתנאים מקוננים עמוק
- חלצו חוקים מורכבים לפונקציות
:::
