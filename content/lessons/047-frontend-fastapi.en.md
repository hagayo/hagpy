---
id: 47
slug: frontend-fastapi
title: Frontend and FastAPI
intro: Understand the complete path from a browser event to a FastAPI response.
layout: legacy-product
---

:::explanation title="The core idea"
Understand the complete path from a browser event to a FastAPI response.
:::

:::codeExample title="Working example" filename="example.py"
```python
Browser → fetch → HTTP → FastAPI → JSON → DOM
```
:::

:::checklist title="Key points"
- Frontend owns interaction
- Backend owns rules and data
- The API is their contract
:::
