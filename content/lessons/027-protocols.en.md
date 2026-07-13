---
id: 27
slug: protocols
title: Protocols and interfaces
intro: Depend on capabilities rather than concrete implementations.
layout: blocks
---

:::explanation title="The core idea"
Depend on capabilities rather than concrete implementations.
:::

:::codeExample title="Working example" filename="example.py"
```python
class UserRepository(Protocol):
    def get(self, user_id: UUID) -> User | None: ...
```
:::

:::checklist title="Key points"
- Protocols support structural typing
- Interfaces protect architectural boundaries
- Keep contracts small and cohesive
:::
