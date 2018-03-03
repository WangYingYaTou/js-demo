function* gen() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
}

var gen1 = gen()
gen1.next()
gen1.next()

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1000), 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2000), 2000)
})

function co(gen) {
  let promise = Promise.resolve()
  let iter = gen()

  function step(it) {
    it.done
      ? // 迭代结束则解决co返回的promise
        (promise = Promise.resolve(it.value))
      : // 否则继续用解决程序解决下一个让步出来的promise
        it.value.then(resolve)
  }

  function resolve(data) {
    // 恢复迭代器并带入promise的终值
    step(iter.next(data))
  }

  resolve()
  return promise
}

co(function*() {
  console.time('all')
  console.log('begin')
  const a = yield promise1
  console.log('a', a)
  const b = yield promise2
  console.log('b', b)
  console.log('end')
  console.timeEnd('all')
})
