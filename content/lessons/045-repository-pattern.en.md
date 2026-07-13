---
id: 45
slug: repository-pattern
title: Repository Pattern and skeleton
intro: Hide persistence behind a small interface that the service can depend on.
layout: legacy-product
---

:::explanation title="The core idea"
Hide persistence behind a small interface that the service can depend on.
:::

:::codeExample title="Working example" filename="example.py"
```python
class DreamRepository(Protocol):
    def save(self, dream): ...
```
:::

:::checklist title="Key points"
- Depend on contracts
- Keep storage outside domain logic
- Swap implementations in tests
:::
