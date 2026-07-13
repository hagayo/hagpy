---
id: 20
slug: function-design
title: Function design
intro: Use defaults, keyword arguments and pure functions deliberately.
layout: blocks
---

:::explanation title="The core idea"
Use defaults, keyword arguments and pure functions deliberately.
:::

:::codeExample title="Working example" filename="example.py"
```python
def create_user(name: str, *, active: bool = True) -> User:
    return User(name=name, active=active)
```
:::

:::checklist title="Key points"
- Avoid mutable default arguments
- Use keyword-only arguments for clarity
- Separate calculation from side effects
:::
