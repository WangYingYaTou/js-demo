const worker = new Worker('./worker.js')

worker.addEventListener('message', e => {
  console.log('MAIN: ', 'RECEIVE', e.data)
})

// 触发事件，传递信息给 Worker
worker.postMessage('Hello Worker, I am main.js')

// 关闭 worker
// worker.terminate();

// 监听 error 事件
worker.addEventListener('error', function(e) {
  console.log('MAIN: ', 'ERROR', e)
  console.log(
    'MAIN: ',
    'ERROR',
    'filename:' +
      e.filename +
      '---message:' +
      e.message +
      '---lineno:' +
      e.lineno
  )
})
