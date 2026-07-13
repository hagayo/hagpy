---
id: 71
slug: accessibility-ui-testing
title: נגישות ובדיקות ממשק
intro: בונים ממשק שעובד עם מקלדת, קוראי מסך, מובייל, RTL והעדפות משתמש.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
בונים ממשק שעובד עם מקלדת, קוראי מסך, מובייל, RTL והעדפות משתמש.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
// Playwright accessibility flow
await page.goto("/")
await page.getByRole("button", { name: "Language" }).click()
await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
await page.keyboard.press("Tab")
```
:::

:::checklist title="נקודות חשובות"
- משתמשים באלמנטים סמנטיים ובשמות נגישים
- בודקים מקלדת, Focus, ניגודיות ו-Zoom
- מאמתים RTL ושתי ערכות צבעים אוטומטית
:::
