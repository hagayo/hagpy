---
id: 34
slug: mocking
title: Mocking וכפילי בדיקה
intro: מחליפים גבולות איטיים או חיצוניים, לא את הלוגיקה העסקית שלכם.
layout: blocks
---

:::explanation title="הרעיון המרכזי"
מחליפים גבולות איטיים או חיצוניים, לא את הלוגיקה העסקית שלכם.
:::

:::codeExample title="דוגמה מעשית" filename="example.py"
```python
gateway = Mock(spec=PaymentGateway)
gateway.charge.return_value = Receipt("ok")
```
:::

:::checklist title="נקודות חשובות"
- בצעו Mock במקום שבו משתמשים בתלות
- השתמשו ב-spec לזיהוי קריאות שגויות
- Fake יכול להיות ברור יותר מ-Mock עמוק
:::
