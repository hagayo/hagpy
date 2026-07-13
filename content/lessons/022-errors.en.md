---
id: 22
slug: errors
title: Errors and exceptions
intro: Fail clearly, preserve context and catch errors only where recovery is possible.
layout: blocks
---

:::explanation title="The core idea"
Fail clearly, preserve context and catch errors only where recovery is possible.
:::

:::codeExample title="Working example" filename="example.py"
```python
try:
    config = load_config(path)
except OSError as error:
    logger.exception("Cannot load config: %s", path)
    raise ConfigurationError(path) from error
```
:::

:::checklist title="Key points"
- Never silently swallow exceptions
- Catch specific exception types
- Log or present failures at the right boundary
:::
