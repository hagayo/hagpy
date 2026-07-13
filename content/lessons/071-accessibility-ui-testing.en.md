---
id: 71
slug: accessibility-ui-testing
title: Accessibility and UI testing
intro: Build an interface that works with keyboards, screen readers, mobile layouts, RTL and user preferences.
layout: blocks
---

:::explanation title="The core idea"
Build an interface that works with keyboards, screen readers, mobile layouts, RTL and user preferences.
:::

:::codeExample title="Working example" filename="example.py"
```python
// Playwright accessibility flow
await page.goto("/")
await page.getByRole("button", { name: "Language" }).click()
await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
await page.keyboard.press("Tab")
```
:::

:::checklist title="Key points"
- Use semantic elements and accessible names
- Test keyboard, focus, contrast and zoom
- Verify RTL and both color themes automatically
:::
