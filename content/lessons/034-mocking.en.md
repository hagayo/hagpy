---
id: 34
slug: mocking
title: Mocking and test doubles
intro: Replace slow or external boundaries, not your own business logic.
layout: blocks
---

:::explanation title="The core idea"
Replace slow or external boundaries, not your own business logic.
:::

:::codeExample title="Working example" filename="example.py"
```python
gateway = Mock(spec=PaymentGateway)
gateway.charge.return_value = Receipt("ok")
```
:::

:::checklist title="Key points"
- Mock where the dependency is used
- Use specs to catch invalid calls
- Fakes can be clearer than deep mocks
:::
