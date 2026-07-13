---
id: 26
slug: composition
title: Composition and inheritance
intro: Prefer collaboration between small objects over deep inheritance trees.
layout: blocks
---

:::explanation title="The core idea"
Prefer collaboration between small objects over deep inheritance trees.
:::

:::codeExample title="Working example" filename="example.py"
```python
class OrderService:
    def __init__(self, repository: OrderRepository) -> None:
        self._repository = repository
```
:::

:::checklist title="Key points"
- Composition makes dependencies visible
- Inherit only for a true substitutable relationship
- Inject collaborators through constructors
:::
