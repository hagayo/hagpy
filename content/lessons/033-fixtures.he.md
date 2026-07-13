---
id: 33
slug: fixtures
title: Fixtures ופרמטריזציה
intro: משתפים הכנה בלי להסתיר את משמעות הבדיקה.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
משתפים הכנה בלי להסתיר את משמעות הבדיקה.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
@pytest.mark.parametrize(("value", "expected"), [(2, True), (3, False)])
def test_is_even(value, expected):
    assert is_even(value) is expected
```
:::

:::checklist title="נקודות חשובות"
- העדיפו Fixtures מקומיים קטנים
- בצעו פרמטריזציה למידע, לא לתהליך שלם
- Factories עדיפים לרוב על Fixture ענקי
:::
