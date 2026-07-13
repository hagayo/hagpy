---
id: 60
slug: docker-fastapi
title: FastAPI בתוך Docker Container
intro: בונים ומריצים FastAPI כ-Image נייד אחד עם תלויות uv.
layout: legacy-product
---

:::explanation title="הרעיון המרכזי"
בונים ומריצים FastAPI כ-Image נייד אחד עם תלויות uv.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
docker build -t dream-api .
docker run -p 8000:8000 dream-api
```
:::

:::checklist title="נקודות חשובות"
- מאזינים על ‎0.0.0.0
- מעתיקים Lockfiles לפני הקוד
- לא מכניסים Secrets ל-Image
:::
