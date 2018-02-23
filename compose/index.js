function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg
  }

  if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce((pre, current) => (...args) => pre(current(...args)))
}

const double = x => x * 2
const pow = x => x * x
const add100 = x => x + 100

const add100PowDouble = compose(double, pow, add100)

console.log(add100PowDouble(100) === 80000)
console.log(add100PowDouble(0) === 20000)
