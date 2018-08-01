function asyncSerialArray(arr, func, callback) {
  let index = 0
  const arrLength = arr.length

  function next(errors) {
    const original = index
    index = index + 1
    if (original < arrLength) {
      func(arr[original], next)
    } else {
      callback([])
    }
  }

  next([])
}

let arr = []
for (let i = 0; i < 5500; i++) {
  arr.push(i)
}

let ret = []
function handle(data, callback) {
  setTimeout(() => {
    ret.push(data * 2)
    callback()
  })
}

asyncSerialArray(arr, handle, () => {
  console.log(ret)
  console.log('done')
})
