---
id: 19
slug: functions
title: Functions
intro: Create small units with explicit inputs, outputs and one responsibility.
layout: legacy-reference
---

:::explanation title="The core idea"
Create small units with explicit inputs, outputs and one responsibility.
:::

:::codeExample title="Working example" filename="example.py"
```python
def calculate_total(price: float, quantity: int) -> float:
    return price * quantity
```
:::

:::checklist title="Key points"
- Prefer return values over printing
- Keep parameters meaningful
- One function should answer one question
:::
