promise 和 await 一些混合用法

Promise 的错误会一直往后传递，如果有 catch 调用链一直往后传递，任意的 then 之后都可以接 catch 用于捕获当前的 then 执行触发的错误，但一般最后一个有 catch 即可，最后的 catch 会捕获第一个出现的错误。



写一个协程