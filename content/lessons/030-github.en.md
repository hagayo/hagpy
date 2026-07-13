---
id: 30
slug: github
title: GitHub and pull requests
intro: Use remote collaboration as a review and automation boundary.
layout: blocks
---

:::explanation title="The core idea"
Use remote collaboration as a review and automation boundary.
:::

:::codeExample title="Working example" filename="example.py"
```python
git remote add origin https://github.com/org/project.git
git push -u origin feature/user-api
```
:::

:::checklist title="Key points"
- Describe why the change exists
- Keep pull requests reviewable
- Protect main and require checks
:::
