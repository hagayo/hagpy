---
id: 43
slug: production
title: Production readiness
intro: Combine configuration, security, logs, health checks and repeatable deployment.
layout: blocks
---

:::explanation title="The core idea"
Combine configuration, security, logs, health checks and repeatable deployment.
:::

:::codeExample title="Working example" filename="example.py"
```python
GET /health/live
GET /health/ready

LOG_LEVEL=INFO
DATABASE_URL=<secret>
```
:::

:::checklist title="Key points"
- Separate liveness and readiness
- Validate configuration at startup
- Deploy immutable, reproducible artifacts
:::
