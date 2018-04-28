stream 是 nodejs 乃至各大语言中都有实现的方法，对于大文件读取灰常有用！

应该说类似于流水线的形式去处理任务，避免把大体积的一次性全读到内存中导致爆炸！💥

所以实现一个简单的 stream，对于深刻理解 stream 模式非常有用。来吧，骚年

```
// test.js
const ReadStream = require('./ReadStream'); // 引入实现的可读流

const rs = new ReadStream('1.txt', {
    flags: 'r',
    // encoding: 'utf8',
    autoClose: true,
    highWaterMark: 3,
    start: 0,
    end: 4
});

rs.on('data', data => {
    console.log(data);
    rs.pause();
});

rs.on('end', () => {
   console.log('end');
});

setTimeout(() => {
    rs.resume();
}, 2000);
```
