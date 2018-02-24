//  next 模式也是在 js 中经常看到，学习下 next 的处理

function App() {
  this.middlewares = []
}

App.prototype.use = function(handler) {
  this.middlewares.push(handler)
}

App.prototype.request = function(req, res, requestHandle = () => {}) {
  /* 开始递归执行中间件 */
  let i = 0
  const next = () => {
    const handler = this.middlewares[i++]
    if (!handler) return
    handler(req, res, next)
  }
  next()
  /* 结束递归执行中间件 */

  // 执行真实的干活
  requestHandle()
}

const sleep = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(100), delay)
  })
}

const app = new App()

// 注册中间件
app.use(async (req, res, next) => {
  const result = await sleep(1000)
  console.log('result', result)
  console.log('this is middleware1')
  next()
})

app.use((req, res, next) => {
  console.log('this is middleware2')
  next()
})

// 注册中间件结束

app.request({}, {}, () => {
  // 真实干活
  console.log('request')

  // 干完活又调用一遍中间件，类似于 express 中 res.end 又触发了一次中间件
  app.request({}, {})
})
