---
id: 53
slug: pydantic-validation-errors
title: Pydantic validation errors
intro: Translate FastAPI 422 details into useful field messages.
layout: legacy-product
---

:::explanation title="The core idea"
Translate FastAPI 422 details into useful field messages.
:::

:::codeExample title="Working example" filename="example.py"
```python
detail[0].loc → ["body", "title"]
```
:::

:::checklist title="Key points"
- 422 has structured details
- Map locations to form fields
- Do not show raw JSON to users
:::
