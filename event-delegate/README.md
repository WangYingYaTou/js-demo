学习一下事件委托是怎么做的？

对标 jquery 的 delegate 实现

```
function delegate(parentDom, selector, eventName, func) {}

delegate(document.getElementByTag('ul'), 'li', 'click', e=>console.log(e))
```

event.target 引起事件触发的元素， event.currentTaget 指向事件绑定的元素，
