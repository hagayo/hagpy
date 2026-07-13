---
id: 31
slug: testing-concepts
title: Testing strategy
intro: Balance unit, integration and end-to-end tests according to risk.
layout: blocks
---

:::explanation title="The core idea"
Balance unit, integration and end-to-end tests according to risk.
:::

:::codeExample title="Working example" filename="example.py"
```python
def test_total_includes_tax():
    assert calculate_total(100, tax_rate=.17) == 117
```
:::

:::checklist title="Key points"
- Test observable behavior
- Keep tests deterministic
- Spend more tests on risky logic
:::
