console.log('WORKER TASK: ', 'running')

const global = this
console.log(global)

// 监听事件
onmessage = function(e) {
  console.log('WORKER TASK: ', 'RECEIVE', e.data)

  // 发送数据事件
  postMessage('Hello, I am Worker')
}

// 为了测试耗时故意写成这样而已，正常来讲有高效率的写法
function fib(n) {
  if (n === 0 || n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

console.time('fib')
const result = fib(40)
console.timeEnd('fib')

postMessage(result)
