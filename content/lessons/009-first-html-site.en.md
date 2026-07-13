---
id: 9
slug: first-html-site
title: Build a local website
intro: Create index.html in the project and preview it through a local HTTP server.
layout: legacy-installation
---

:::explanation title="The core idea"
Create index.html in the project and preview it through a local HTTP server.
:::

:::codeExample title="Working example" filename="example.py"
```python
New file: index.html
uv run python -m http.server 8000
Open http://localhost:8000
```
:::

:::checklist title="Key points"
- index.html belongs at the project root
- Preview through a local HTTP server
- Verify the page before committing
:::
