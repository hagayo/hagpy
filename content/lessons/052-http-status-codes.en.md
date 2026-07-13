---
id: 52
slug: http-status-codes
title: HTTP Status Codes
intro: Read status codes as part of the API contract, not decorative numbers.
layout: legacy-product
---

:::explanation title="The core idea"
Read status codes as part of the API contract, not decorative numbers.
:::

:::codeExample title="Working example" filename="example.py"
```python
200 201 204 400 401 403 404 409 422 500
```
:::

:::checklist title="Key points"
- 2xx means success
- 4xx describes request problems
- 5xx describes server failure
:::
