---
id: 24
slug: classes
title: Classes and objects
intro: Use classes when state and behavior belong together.
layout: legacy-reference
---

:::explanation title="The core idea"
Use classes when state and behavior belong together.
:::

:::codeExample title="Working example" filename="example.py"
```python
class Account:
    def __init__(self, balance: int = 0) -> None:
        self._balance = balance

    def deposit(self, amount: int) -> None:
        self._balance += amount
```
:::

:::checklist title="Key points"
- Objects protect valid state
- Methods express domain behavior
- Do not create classes as function containers
:::
