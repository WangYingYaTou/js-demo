// CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
// http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html
var a = require('./a.js')
var b = require('./b.js')
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done)
