---
id: 60
slug: docker-fastapi
title: FastAPI in a Docker container
intro: Build and run one portable FastAPI image with uv dependencies.
layout: legacy-product
---

:::explanation title="The core idea"
Build and run one portable FastAPI image with uv dependencies.
:::

:::codeExample title="Working example" filename="example.py"
```python
docker build -t dream-api .
docker run -p 8000:8000 dream-api
```
:::

:::checklist title="Key points"
- Bind to 0.0.0.0
- Copy lockfiles before source
- Keep secrets out of images
:::
