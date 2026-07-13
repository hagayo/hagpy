---
id: 38
slug: pydantic-validation
title: Pydantic validation and settings
intro: Express cross-field rules and load typed configuration safely.
layout: blocks
---

:::explanation title="The core idea"
Express cross-field rules and load typed configuration safely.
:::

:::codeExample title="Working example" filename="example.py"
```python
class Settings(BaseSettings):
    database_url: SecretStr
    log_level: Literal["INFO", "DEBUG"] = "INFO"
```
:::

:::checklist title="Key points"
- Keep validators deterministic
- Use pydantic-settings for environment config
- Never print secret values
:::
