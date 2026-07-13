---
id: 31
slug: testing-concepts
title: אסטרטגיית בדיקות
intro: מאזנים בדיקות יחידה, אינטגרציה ומקצה לקצה לפי הסיכון.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מאזנים בדיקות יחידה, אינטגרציה ומקצה לקצה לפי הסיכון.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
def test_total_includes_tax():
    assert calculate_total(100, tax_rate=.17) == 117
```
:::

:::checklist title="נקודות חשובות"
- בדקו התנהגות נצפית
- שמרו על בדיקות צפויות
- השקיעו יותר בדיקות בלוגיקה מסוכנת
:::
