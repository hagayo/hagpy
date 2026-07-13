---
id: 25
slug: dataclasses
title: Dataclasses and value objects
intro: Represent data-rich concepts without repetitive boilerplate.
layout: blocks
---

:::explanation title="The core idea"
Represent data-rich concepts without repetitive boilerplate.
:::

:::codeExample title="Working example" filename="example.py"
```python
@dataclass(frozen=True, slots=True)
class Money:
    amount: Decimal
    currency: str
```
:::

:::checklist title="Key points"
- Frozen value objects are easier to reason about
- Use slots when appropriate, not automatically
- Validation still belongs at construction
:::
