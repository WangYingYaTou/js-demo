'use strict'

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()


function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Promise = (function() {
  function Promise(executor) {
    _classCallCheck(this, Promise)
  }

  _createClass(Promise, [
    {
      key: 'then',
      value: function then() {},
    },
    {
      key: 'resolve',
      value: function resolve() {},
    },
    {
      key: 'reject',
      value: function reject() {},
    },
  ])

  return Promise
})()

var promise = new Promise()

var Promise1 = (function(_Promise) {
  _inherits(Promise1, _Promise)

  function Promise1() {
    _classCallCheck(this, Promise1)

    return _possibleConstructorReturn(
      this,
      (Promise1.__proto__ || Object.getPrototypeOf(Promise1)).apply(
        this,
        arguments
      )
    )
  }

  _createClass(Promise1, [
    {
      key: 'then',
      value: function then() {},
    },
    {
      key: 'then1',
      value: function then1() {},
    },
  ])

  return Promise1
})(Promise)

var promise1 = new Promise1()

var o = new Object()
o.__proto__ = Foo.prototype
Foo.call(o)
return o
;('use strict')

var _obj

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype
  var desc = Object.getOwnPropertyDescriptor(object, property)
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object)
    if (parent === null) {
      return undefined
    } else {
      return get(parent, property, receiver)
    }
  } else if ('value' in desc) {
    return desc.value
  } else {
    var getter = desc.get
    if (getter === undefined) {
      return undefined
    }
    return getter.call(receiver)
  }
}

var obj = (_obj = {
  toString: function toString() {
    // Super calls
    return (
      'd ' +
      _get(
        _obj.__proto__ || Object.getPrototypeOf(_obj),
        'toString',
        this
      ).call(this)
    )
  },
})
