---
id: 42
slug: fastapi-errors
title: שגיאות וניטור ב-FastAPI
intro: מדווחים על כשלים בעקביות בלי לחשוף מידע פנימי.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מדווחים על כשלים בעקביות בלי לחשוף מידע פנימי.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
@app.exception_handler(EntityNotFound)
async def not_found_handler(request, error):
    logger.info("Entity not found", extra={"path": request.url.path})
    return JSONResponse(status_code=404, content={"code": "not_found"})
```
:::

:::checklist title="נקודות חשובות"
- מפו שגיאות עסקיות בגבול HTTP
- תעדו הקשר בלי סודות
- השתמשו במזהי קורלציה
:::
