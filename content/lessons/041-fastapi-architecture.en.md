---
id: 41
slug: fastapi-architecture
title: FastAPI architecture
intro: Separate transport, use cases, domain rules and persistence.
layout: blocks
---

:::explanation title="The core idea"
Separate transport, use cases, domain rules and persistence.
:::

:::codeExample title="Working example" filename="example.py"
```python
Router -> Service -> Repository Protocol -> Database
                 -> Domain Models
```
:::

:::checklist title="Key points"
- Framework code stays at the edge
- Services own use cases
- Repositories hide persistence details
:::
