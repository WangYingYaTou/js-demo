function asyncFun1() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(1)
      const result2 = await asyncFun2()
      resolve(result2)
    }, 0)
  })
}

function asyncFun2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 0)
  })
}

asyncFun1().then(res => {
  console.log(res)
})
