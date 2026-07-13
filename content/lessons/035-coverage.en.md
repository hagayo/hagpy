---
id: 35
slug: coverage
title: Coverage and missing risk
intro: Use coverage to find unexecuted risk, not to manufacture a perfect score.
layout: blocks
---

:::explanation title="The core idea"
Use coverage to find unexecuted risk, not to manufacture a perfect score.
:::

:::codeExample title="Working example" filename="example.py"
```python
uv run pytest --cov=src --cov-branch --cov-report=term-missing
```
:::

:::checklist title="Key points"
- Branch coverage reveals missed decisions
- Coverage cannot judge assertions
- Set thresholds according to project risk
:::
