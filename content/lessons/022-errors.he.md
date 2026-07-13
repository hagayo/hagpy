---
id: 22
slug: errors
title: שגיאות וחריגות
intro: נכשלים בצורה ברורה, שומרים הקשר ותופסים שגיאות רק כשאפשר להתאושש.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
נכשלים בצורה ברורה, שומרים הקשר ותופסים שגיאות רק כשאפשר להתאושש.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
try:
    config = load_config(path)
except OSError as error:
    logger.exception("Cannot load config: %s", path)
    raise ConfigurationError(path) from error
```
:::

:::checklist title="נקודות חשובות"
- לעולם אל תבלעו חריגות בשקט
- תפסו סוגי שגיאה מדויקים
- דווחו על כשל בגבול המתאים
:::
