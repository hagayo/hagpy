---
id: 51
slug: frontend-loading-errors
title: Loading states and errors
intro: Design the interface for waiting, empty results, failures and retry.
layout: legacy-product
---

:::explanation title="The core idea"
Design the interface for waiting, empty results, failures and retry.
:::

:::codeExample title="Working example" filename="example.py"
```python
idle → loading → success | empty | error
```
:::

:::checklist title="Key points"
- Disable duplicate actions
- Show actionable errors
- Always leave loading state
:::
