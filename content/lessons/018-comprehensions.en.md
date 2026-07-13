---
id: 18
slug: comprehensions
title: Comprehensions
intro: Transform collections concisely without hiding complex logic.
layout: blocks
---

:::explanation title="The core idea"
Transform collections concisely without hiding complex logic.
:::

:::codeExample title="Working example" filename="example.py"
```python
passed = [score for score in scores if score >= 60]
by_id = {user.id: user for user in users}
```
:::

:::checklist title="Key points"
- Keep one transformation per comprehension
- Prefer a loop when logic needs explanation
- Generator expressions avoid eager lists
:::
