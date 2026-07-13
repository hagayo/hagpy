---
id: 54
slug: same-origin-cors
title: Same Origin and CORS
intro: Understand when the browser blocks a response and configure only trusted origins.
layout: legacy-product
---

:::explanation title="The core idea"
Understand when the browser blocks a response and configure only trusted origins.
:::

:::codeExample title="Working example" filename="example.py"
```python
origin = scheme + host + port
```
:::

:::checklist title="Key points"
- Same origin needs no CORS
- Different ports are different origins
- CORS is enforced by browsers
:::
