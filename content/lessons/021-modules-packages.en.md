---
id: 21
slug: modules-packages
title: Modules and packages
intro: Split code by responsibility and expose a small public interface.
layout: blocks
---

:::explanation title="The core idea"
Split code by responsibility and expose a small public interface.
:::

:::codeExample title="Working example" filename="example.py"
```python
from my_app.services.pricing import calculate_total

__all__ = ["calculate_total"]
```
:::

:::checklist title="Key points"
- A file is a module
- A directory package groups related modules
- Avoid circular imports by improving boundaries
:::
