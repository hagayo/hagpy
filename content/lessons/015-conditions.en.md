---
id: 15
slug: conditions
title: Conditions
intro: Express decisions with small, readable boolean rules.
layout: blocks
---

:::explanation title="The core idea"
Express decisions with small, readable boolean rules.
:::

:::codeExample title="Working example" filename="example.py"
```python
if score >= 90:
    grade = "excellent"
elif score >= 70:
    grade = "good"
else:
    grade = "practice"
```
:::

:::checklist title="Key points"
- Use truthiness intentionally
- Avoid deeply nested conditions
- Extract complex rules into named functions
:::
