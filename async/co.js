function* gen() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
}

var gen1 = gen()
gen1.next()
gen1.next()

function gen1() {
  let step = 0,
    value
  return function() {
    while (1) {
      switch (step) {
        case 0:
          step = step + 1
          value = { status: 'unresolved', value: 1 }
          break
        case 1:
          step = step + 1
          value = { status: 'unresolved', value: 2 }
        case 3:
          step = step + 1
          value = { status: 'done', value: undefined }
      }
    }
    return value
  }
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1000), 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2000), 2000)
})

function co1(generator) {
  var gen = generator()
  return new Promise((resolve, reject) => {
    next()
    function next(res) {
      try {
        var ret = gen.next(res)
        if (ret.done) return resolve(ret.value)
        ret.value.then(function(val) {
          next(val)
        })
      } catch (e) {
        return reject(e)
      }
    }
  })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1000), 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2000), 2000)
})

co1(function*() {
  console.time('all')
  console.log('begin')
  const a = yield promise1
  console.log('a', a)
  const b = yield promise2
  console.log('b', b)
  console.log('end')
  console.timeEnd('all')
  return b
}).then(value => {
  console.log('all then')
  console.log('value', value)
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

co1(function*() {
  console.time('all')
  console.log('begin')
  const a = yield promise1
  console.log('a', a)
  const b = yield promise2
  console.log('b', b)
  console.log('end')
  console.timeEnd('all')
})

// a 1000
// b 2000
// end
// all: 2003.967041015625ms
// all then
// value 2000
