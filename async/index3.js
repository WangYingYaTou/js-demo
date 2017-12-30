function asyncFun1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 0)

    setTimeout(() => {
      reject(new Error('错啦'))
    }, 0)
  })
}

function asyncFun2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 0)

    setTimeout(() => {
      reject(new Error('又错啦'))
    }, 0)
  })
}

asyncFun1()
  .then(value => {
    console.log(value)
  })
  .then(() => {
    return asyncFun2()
  })
  .then(val => {
    console.log(val)
  })
  .catch(err => {
    console.log('end: ', err)
  })

// Promise 的错误会一直往后传递，如果有catch调用链一直往后传递
// 任意的 then 之后都可以接 catch 用于捕获当前的 then执行触发的错误
// 但一般最后一个有 catch 即可，最后的 catch 会捕获第一个出现的错误。
