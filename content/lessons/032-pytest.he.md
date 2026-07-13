---
id: 32
slug: pytest
title: יסודות pytest
intro: כותבים בדיקות ברורות עם שלבי הכנה, פעולה ובדיקה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
כותבים בדיקות ברורות עם שלבי הכנה, פעולה ובדיקה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
def test_empty_cart_total_is_zero():
    cart = Cart()
    result = cart.total()
    assert result == 0
```
:::

:::checklist title="נקודות חשובות"
- שמות בדיקות מתארים התנהגות
- סיבת כשל אחת לכל בדיקה
- השתמשו ב-pytest.raises לחריגות צפויות
:::
