---
id: 37
slug: pydantic-models
title: Pydantic models
intro: Validate untrusted input at system boundaries.
layout: blocks
---

:::explanation title="The core idea"
Validate untrusted input at system boundaries.
:::

:::codeExample title="Working example" filename="example.py"
```python
class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
```
:::

:::checklist title="Key points"
- Models are boundary contracts
- Separate create, update and read schemas
- Do not leak secret fields
:::
