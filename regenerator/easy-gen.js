class Generator {
  next(arg) {
    return this._invoke('next', arg)
  }
}

class Context {
  constructor() {
    this.state = 0
    this.done = false
    this.value = undefined
    this.send = undefined
  }

  stop() {
    this.done = true
  }
}

function doneResult() {
  return {
    done: true,
    value: undefined
  }
}


function wrap(innerFn) {
  const context = new Context
  const generator = new Generator

  generator._invoke = (method, arg) => {
    context.method = method
    if (context.done) {
      return doneResult()
    }

    if (context.method === 'next') {
      context.send = arg
    }

    const value = innerFn(context)

    return {
      done: context.done,
      value: value
    }
  }

  return generator
}


function evenNumber() {
  let a
  return wrap(function (context) {
    while (true) {
      switch (context.state) {
        case 0:
          a = 0
        case 1:
          if (a >= 10) {
            context.state = 3;
            break;
          }
          if (a % 2 !== 0) {
            context.state = 2;
            break;
          }
          context.state = 2;
          return a;
        case 2:
          a++;
          context.state = 1;
          break;
        case 3:
          return context.stop();
      }
    }
  })
}

const iter = evenNumber()

console.log(iter.next());
console.log(iter.next()); //  { value: 0, done: false }
console.log(iter.next()); //  { value: 2, done: false }
console.log(iter.next()); //  { value: 4, done: false }
console.log(iter.next()); //  { value: 6, done: false }
console.log(iter.next()); //  { value: 8, done: false }
console.log(iter.next()); //  { value: undefined, done: true }
console.log(iter.next()); //  { value: undefined, done: true }
console.log(iter.next()); //  { value: undefined, done: true }
console.log(iter.next()); //  { value: undefined, done: true }
