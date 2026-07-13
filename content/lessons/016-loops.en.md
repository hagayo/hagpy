---
id: 16
slug: loops
title: Loops and iteration
intro: Process collections with for, range and enumeration.
layout: blocks
---

:::explanation title="The core idea"
Process collections with for, range and enumeration.
:::

:::codeExample title="Working example" filename="example.py"
```python
for index, topic in enumerate(topics, start=1):
    print(index, topic)
```
:::

:::checklist title="Key points"
- Iterate over values, not indexes
- Use enumerate when the position matters
- Use break and continue sparingly
:::
