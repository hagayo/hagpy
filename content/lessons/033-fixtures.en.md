---
id: 33
slug: fixtures
title: Fixtures and parametrization
intro: Reuse setup without hiding the meaning of a test.
layout: blocks
---

:::explanation title="The core idea"
Reuse setup without hiding the meaning of a test.
:::

:::codeExample title="Working example" filename="example.py"
```python
@pytest.mark.parametrize(("value", "expected"), [(2, True), (3, False)])
def test_is_even(value, expected):
    assert is_even(value) is expected
```
:::

:::checklist title="Key points"
- Prefer small local fixtures
- Parametrize data, not entire workflows
- Factories often beat giant fixtures
:::
