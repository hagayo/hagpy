---
id: 5
slug: verify-installation
title: Verify the installation
intro: Run one checklist that proves Git, uv, Python and VS Code are available.
layout: legacy-installation
---

:::explanation title="The core idea"
Run one checklist that proves Git, uv, Python and VS Code are available.
:::

:::codeExample title="Working example" filename="example.py"
```python
git --version
uv --version
uv run python --version
code --version
```
:::

:::checklist title="Key points"
- Every command must return a version
- Use a fresh PowerShell window
- Fix PATH problems before continuing
:::
