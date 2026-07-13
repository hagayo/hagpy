---
id: 14
slug: strings
title: Strings and formatting
intro: Build, inspect and format text without fragile concatenation.
layout: blocks
---

:::explanation title="The core idea"
Build, inspect and format text without fragile concatenation.
:::

:::codeExample title="Working example" filename="example.py"
```python
name = "Maya"
lessons = 8
message = f"{name} completed {lessons} lessons"
```
:::

:::checklist title="Key points"
- Prefer f-strings for formatting
- Strings are immutable
- Normalize external text deliberately
:::
