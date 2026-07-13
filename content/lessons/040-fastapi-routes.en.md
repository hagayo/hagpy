---
id: 40
slug: fastapi-routes
title: FastAPI routes and dependencies
intro: Translate HTTP into focused application calls.
layout: blocks
---

:::explanation title="The core idea"
Translate HTTP into focused application calls.
:::

:::codeExample title="Working example" filename="example.py"
```python
@router.post("/users", response_model=UserRead, status_code=201)
def create_user(payload: UserCreate, service: UserService = Depends(get_service)):
    return service.create(payload)
```
:::

:::checklist title="Key points"
- Routes should stay thin
- Dependencies are explicit collaborators
- Response models protect the contract
:::
