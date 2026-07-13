---
id: 17
slug: collections
title: Lists, tuples, sets and dictionaries
intro: Choose a collection according to its semantics, not habit.
layout: blocks
---

:::explanation title="The core idea"
Choose a collection according to its semantics, not habit.
:::

:::codeExample title="Working example" filename="example.py"
```python
student = {"name": "Maya", "skills": {"python", "git"}}
student["skills"].add("pytest")
```
:::

:::checklist title="Key points"
- List means ordered and mutable
- Tuple represents a fixed record
- Set gives uniqueness; dict maps keys to values
:::
