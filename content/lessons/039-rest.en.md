---
id: 39
slug: rest
title: REST and HTTP design
intro: Design stable resource contracts with meaningful methods and status codes.
layout: blocks
---

:::explanation title="The core idea"
Design stable resource contracts with meaningful methods and status codes.
:::

:::codeExample title="Working example" filename="example.py"
```python
GET /users/{id}       200 | 404
POST /users           201 | 422
DELETE /users/{id}    204 | 404
```
:::

:::checklist title="Key points"
- URLs identify resources
- Methods express intent
- Errors need stable response shapes
:::
