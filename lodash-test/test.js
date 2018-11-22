const _ = require('./lodash.core.js')

debugger

function square(n) {
  return n * n;
}

var wrapped = _([1, 2, 3]);

// var x = wrapped.reduce(_.add)
// console.log('x', x)

var squares = wrapped.map(square);

console.log(_.isArray(squares))

console.log(_.isArray(squares.value()))

console.log(squares)

console.log(squares.value())
