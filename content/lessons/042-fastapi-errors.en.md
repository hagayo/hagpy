---
id: 42
slug: fastapi-errors
title: FastAPI errors and observability
intro: Report failures consistently without leaking internals.
layout: blocks
---

:::explanation title="The core idea"
Report failures consistently without leaking internals.
:::

:::codeExample title="Working example" filename="example.py"
```python
@app.exception_handler(EntityNotFound)
async def not_found_handler(request, error):
    logger.info("Entity not found", extra={"path": request.url.path})
    return JSONResponse(status_code=404, content={"code": "not_found"})
```
:::

:::checklist title="Key points"
- Map domain errors at the HTTP boundary
- Log context without secrets
- Use correlation IDs across requests
:::
