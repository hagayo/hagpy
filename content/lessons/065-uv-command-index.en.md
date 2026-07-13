---
id: 65
slug: uv-command-index
title: uv command index
intro: Use a task-oriented reference for projects, Python versions, dependencies, lockfiles and execution.
layout: blocks
---

:::explanation title="The core idea"
Use a task-oriented reference for projects, Python versions, dependencies, lockfiles and execution.
:::

:::codeExample title="Working example" filename="example.py"
```python
uv init my-project
uv python install 3.12
uv add fastapi
uv add --dev pytest ruff
uv lock
uv sync --frozen
uv run pytest
```
:::

:::checklist title="Key points"
- Explain what each command changes
- Separate local development from CI commands
- Include safe upgrade and removal workflows
:::
