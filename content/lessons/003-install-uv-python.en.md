---
id: 3
slug: install-uv-python
title: Install uv and Python
intro: Install uv, use it to install Python, and avoid conflicting global environments.
layout: legacy-installation
---

:::explanation title="The core idea"
Install uv, use it to install Python, and avoid conflicting global environments.
:::

:::codeExample title="Working example" filename="example.py"
```python
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uv python install 3.12
uv python list
```
:::

:::checklist title="Key points"
- uv manages Python and dependencies
- Python does not need a separate installer
- Projects receive isolated environments
:::
