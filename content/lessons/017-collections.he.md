---
id: 17
slug: collections
title: רשימות, Tuples, Sets ומילונים
intro: בוחרים אוסף לפי המשמעות שלו, לא לפי הרגל.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
בוחרים אוסף לפי המשמעות שלו, לא לפי הרגל.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
student = {"name": "Maya", "skills": {"python", "git"}}
student["skills"].add("pytest")
```
:::

:::checklist title="נקודות חשובות"
- List הוא מסודר וניתן לשינוי
- Tuple מייצג רשומה קבועה
- Set מבטיח ייחודיות ו-dict ממפה מפתחות
:::
