---
id: 44
slug: service-layer
title: Service Layer
intro: Move business use cases out of HTTP routes and keep them testable.
layout: legacy-product
---

:::explanation title="The core idea"
Move business use cases out of HTTP routes and keep them testable.
:::

:::codeExample title="Working example" filename="example.py"
```python
class DreamService:
    def create(self, command): ...
```
:::

:::checklist title="Key points"
- Routes translate HTTP
- Services own use cases
- Repositories own persistence
:::
