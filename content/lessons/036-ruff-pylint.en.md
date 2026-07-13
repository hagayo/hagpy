---
id: 36
slug: ruff-pylint
title: Ruff and Pylint
intro: Combine fast automated checks with deeper design feedback.
layout: blocks
---

:::explanation title="The core idea"
Combine fast automated checks with deeper design feedback.
:::

:::codeExample title="Working example" filename="example.py"
```python
uv run ruff check .
uv run ruff format --check .
uv run pylint src
```
:::

:::checklist title="Key points"
- Ruff handles fast linting and formatting
- Pylint provides deeper diagnostics
- Configure tools in pyproject.toml
:::
