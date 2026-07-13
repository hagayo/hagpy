---
id: 23
slug: files
title: Files and paths
intro: Read and write files safely with pathlib and context managers.
layout: blocks
---

:::explanation title="The core idea"
Read and write files safely with pathlib and context managers.
:::

:::codeExample title="Working example" filename="example.py"
```python
from pathlib import Path

text = Path("README.md").read_text(encoding="utf-8")
```
:::

:::checklist title="Key points"
- Use pathlib instead of manual separators
- Specify text encoding
- Treat file I/O as a failure boundary
:::
