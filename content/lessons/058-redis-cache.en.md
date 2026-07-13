---
id: 58
slug: redis-cache
title: Redis as a cache layer
intro: Use temporary fast data to reduce repeated database work without replacing the database.
layout: legacy-product
---

:::explanation title="The core idea"
Use temporary fast data to reduce repeated database work without replacing the database.
:::

:::codeExample title="Working example" filename="example.py"
```python
cache-aside: GET → miss → DB → SETEX
```
:::

:::checklist title="Key points"
- Cache data may disappear
- TTL prevents stale entries living forever
- Invalidation is the hard part
:::
