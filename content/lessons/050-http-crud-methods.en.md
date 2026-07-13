---
id: 50
slug: http-crud-methods
title: GET, POST, PATCH and DELETE
intro: Choose the HTTP method that matches the intent and response.
layout: legacy-product
---

:::explanation title="The core idea"
Choose the HTTP method that matches the intent and response.
:::

:::codeExample title="Working example" filename="example.py"
```python
GET /api/dreams
POST /api/dreams
PATCH /api/dreams/{id}
DELETE /api/dreams/{id}
```
:::

:::checklist title="Key points"
- GET reads
- POST creates
- PATCH changes selected fields
:::
