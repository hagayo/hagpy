---
id: 48
slug: fetch-api
title: The Fetch API
intro: Send asynchronous browser requests and inspect the Response correctly.
layout: legacy-product
---

:::explanation title="The core idea"
Send asynchronous browser requests and inspect the Response correctly.
:::

:::codeExample title="Working example" filename="example.py"
```python
const response = await fetch("/api/dreams");
```
:::

:::checklist title="Key points"
- fetch returns a Promise
- HTTP errors do not reject automatically
- Parse the body once
:::
