function* fibonaciiUsingYield() {
  let i = 1
  let j = 1
  while (true) {
    yield i
    yield j
    i += j
    j += i
  }
}

const gen = fibonaciiUsingYield()
gen.next()

function genFibonaciiCoroutine() {
  let i = 1
  let j = 1
  let state = 1
  return function() {
    let retVal
    switch (state) {
      case 0:
        i += j
        j += i
        state = 1
      case 1:
        retVal = i
        state = 2
        break
      case 2:
        retVal = j
        state = 0
        break
    }
    return retVal
  }
}

const gen1 = genFibonaciiCoroutine()

gen1()
gen1()
gen1()
gen1()

function generator() {
  let value,
    done = false

  function next() {
    return {
      value: value,
      done: done,
    }
  }
  return {
    next: next(),
  }
}

const gen = generator()
gen.next()
