函数调用的形式实现动画效果

```
const box = document.getElementById('box')

box
  .animate({ height: '100px', scale: '0.3', duration: 0.3 })
  .animate({ top: '200px', duration: 0.5 })
```
