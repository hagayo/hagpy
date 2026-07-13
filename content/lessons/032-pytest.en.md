---
id: 32
slug: pytest
title: pytest fundamentals
intro: Write expressive tests with clear arrange, act and assert phases.
layout: blocks
---

:::explanation title="The core idea"
Write expressive tests with clear arrange, act and assert phases.
:::

:::codeExample title="Working example" filename="example.py"
```python
def test_empty_cart_total_is_zero():
    cart = Cart()
    result = cart.total()
    assert result == 0
```
:::

:::checklist title="Key points"
- Test names describe behavior
- One failure reason per test
- Use pytest.raises for expected exceptions
:::
