---
id: 68
slug: python-exceptions
title: Python exceptions index
intro: Recognize common built-in exceptions and decide where recovery, wrapping or reporting belongs.
layout: blocks
---

:::explanation title="The core idea"
Recognize common built-in exceptions and decide where recovery, wrapping or reporting belongs.
:::

:::codeExample title="Working example" filename="example.py"
```python
ValueError       Right type, invalid value
TypeError        Unsupported type or operation
KeyError         Missing dictionary key
FileNotFoundError Missing file path
TimeoutError     Operation exceeded its deadline
OSError          Operating-system or I/O failure
```
:::

:::checklist title="Key points"
- Catch the narrowest exception type
- Preserve causes with raise from
- Never use a bare except to hide failure
:::
