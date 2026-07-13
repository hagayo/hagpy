---
id: 46
slug: secrets-env
title: Secrets, API keys and .env
intro: Keep credentials outside code and outside Git history.
layout: legacy-product
---

:::explanation title="The core idea"
Keep credentials outside code and outside Git history.
:::

:::codeExample title="Working example" filename="example.py"
```python
API_KEY=replace-me
DATABASE_URL=postgresql://...
```
:::

:::checklist title="Key points"
- Secrets are configuration
- Commit .env.example, never .env
- Validate settings at startup
:::
