---
id: 10
slug: push-first-repository
title: Push the project to GitHub
intro: Initialize local Git, create the first commit and push main to the empty repository.
layout: legacy-installation
---

:::explanation title="The core idea"
Initialize local Git, create the first commit and push main to the empty repository.
:::

:::codeExample title="Working example" filename="example.py"
```python
git init
git add .
git commit -m "Create first website"
git branch -M main
git remote add origin https://github.com/USERNAME/hagpy-first-site.git
git push -u origin main
```
:::

:::checklist title="Key points"
- Review git status before committing
- Authenticate through the browser when prompted
- Verify the files on GitHub after the push
:::
