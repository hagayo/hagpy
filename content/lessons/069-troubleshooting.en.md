---
id: 69
slug: troubleshooting
title: Python troubleshooting
intro: Diagnose environment, imports, dependencies, tests and server startup with a repeatable process.
layout: blocks
---

:::explanation title="The core idea"
Diagnose environment, imports, dependencies, tests and server startup with a repeatable process.
:::

:::codeExample title="Working example" filename="example.py"
```python
uv run python --version
uv sync
uv run python -c "import sys; print(sys.executable)"
uv run pytest -x -vv
uv run fastapi dev src/app/main.py
```
:::

:::checklist title="Key points"
- Reproduce the smallest failing command
- Read the complete error and chained cause
- Record environment and version evidence
:::
