---
id: 28
slug: type-hints
title: Type hints
intro: Make contracts visible to humans, editors and static analyzers.
layout: blocks
---

:::explanation title="The core idea"
Make contracts visible to humans, editors and static analyzers.
:::

:::codeExample title="Working example" filename="example.py"
```python
def find_user(user_id: UUID) -> User | None:
    ...
```
:::

:::checklist title="Key points"
- Types document expectations
- Use precise collections and optionality
- Static checking complements runtime validation
:::
