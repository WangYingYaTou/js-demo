const sleep = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay)
  })
}

async function async1() {
  console.log('async1')
  const result1 = await sleep(1000)
  console.log('result1', result1)
}

function sync1() {
  console.log('sync1')
}

async function async2() {
  console.log('async2')
  const result2 = await sleep(2000)
  console.log('result2', result2)
}

function sync2() {
  console.log('sync2')
}

function test() {
  async1()
  sync1()
  async2()
  sync2()
}

test()
