// function* evenNumber() {
//   for (let a = 0; a < 10; ++a) {
//       if (a % 2 === 0) {
//           yield a;
//       }       
//   }
// }


let a = 0

while (a < 10) {
  if (a % 2 === 0) {
    yield 2
  }
  a++
}




function evenNumber() {
  let done = false
  let state = 0

  let a

  function stop() {
    done = true
  }

  function run() {
    while (true) {
      switch (state) {
        case 0:
          a = 0
        case 1:
          if (a > 10) {
            state = 3
            break
          }
          if (a % 2 !== 0) {
            state = 2
            break
          }
          state = 2
          return a
        case 2:
          a++
          state = 1
          break
        case 3:
          return stop()
      }
    }
  }

  return {
    next() {
      if (done) {
        return {
          value: undefined,
          done: true
        }
      }
      const value = run()
      return {
        value,
        done: false
      }
    },
  }
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
