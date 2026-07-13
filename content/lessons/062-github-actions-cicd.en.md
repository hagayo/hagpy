---
id: 62
slug: github-actions-cicd
title: CI/CD with GitHub Actions
intro: Create a workflow that installs with uv, checks quality and runs tests.
layout: legacy-product
---

:::explanation title="The core idea"
Create a workflow that installs with uv, checks quality and runs tests.
:::

:::codeExample title="Working example" filename="example.py"
```python
.github/workflows/ci.yml
```
:::

:::checklist title="Key points"
- Events trigger workflows
- Jobs run on fresh runners
- A failing step stops the job
:::
