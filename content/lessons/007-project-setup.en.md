---
id: 7
slug: project-setup
title: Project setup and library management
intro: Create the first local course project with uv and open it in VS Code.
layout: legacy-installation
---

:::explanation title="The core idea"
Create the first local course project with uv and open it in VS Code.
:::

:::codeExample title="Working example" filename="example.py"
```python
cd C:\AI-DEV-2026
uv init --bare --vcs none hagpy-first-site
cd hagpy-first-site
code .
```
:::

:::checklist title="Key points"
- Create the project inside the workspace folder
- Use uv init deliberately
- Open VS Code from the project root
:::
