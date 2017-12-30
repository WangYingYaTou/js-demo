function asyncFun1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
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

function syncFun3() {
  console.log('syncFun3')
  return 3
}

async function test() {
  console.log('begin')
  let a = 1
  if (true) {
    console.log('esle if false')
  }

  if (a === (await asyncFun1())) {
    console.log('a === await asyncFun1')
  } else if (true) {
    console.log('esle if true')
  }
  const result2 = await asyncFun2()
  console.log(result2)
  const result3 = await syncFun3()
  console.log('result3:' + result3)
  console.log('end')
}

test()
