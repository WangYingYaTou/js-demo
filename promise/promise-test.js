const promise1 = new Promise((resolve, reject) => {
  console.log('promise1 start')
  setTimeout(() => {
    const value = Math.random()
    console.log('setTimeout resolve: ', value)
    resolve(value)
  }, Math.random() * 10000)

  setTimeout(() => {
    const value = Math.random()
    console.log('setTimeout reject: ', value)
    reject(value)
  }, Math.random() * 10000)

  console.log('promise1 end')
})

promise1
  .then(value => {
    if (value > 0.5) {
      console.log('then1: ', value)
      console.log('promise1', promise1)
      return promise1
    } else {
      console.log('then1 else: ', value)
      return promise1
    }
  })
  .then(value => {
    console.log('then2 value', value)
    if (value > 0.5) {
      console.log('then2: ', value)
      return promise1
    } else {
      console.log('then2 else: ', value)
      return promise1
    }
  })
  .catch(err => {
    console.log('catch: ', err)
  })
