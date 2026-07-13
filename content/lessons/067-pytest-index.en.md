---
id: 67
slug: pytest-index
title: pytest command index
intro: Run targeted tests, markers, failures, coverage and debugging without guessing flags.
layout: blocks
---

:::explanation title="The core idea"
Run targeted tests, markers, failures, coverage and debugging without guessing flags.
:::

:::codeExample title="Working example" filename="example.py"
```python
uv run pytest
uv run pytest tests/test_users.py
uv run pytest -k "create_user"
uv run pytest -x --pdb
uv run pytest --cov=src --cov-branch
```
:::

:::checklist title="Key points"
- Start with the narrowest useful test scope
- Use verbose failure output when diagnosing
- Keep permanent options in pyproject.toml
:::
