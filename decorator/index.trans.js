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

var _dec, _desc, _value, _class

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {}
  Object['ke' + 'ys'](descriptor).forEach(function(key) {
    desc[key] = descriptor[key]
  })
  desc.enumerable = !!desc.enumerable
  desc.configurable = !!desc.configurable

  if ('value' in desc || desc.initializer) {
    desc.writable = true
  }

  desc = decorators
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc
    }, desc)

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0
    desc.initializer = undefined
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc)
    desc = null
  }

  return desc
}

var MyClass = ((_dec = callLimit(1)),
((_class = (function() {
  function MyClass() {
    _classCallCheck(this, MyClass)
  }

  _createClass(MyClass, [
    {
      key: 'getSum',
      value: function getSum() {
        console.log('calculate')
        return Math.pow(3, 12)
      },
    },
    {
      key: 'init',
      value: function init() {
        console.log('init')
      },
    },
  ])

  return MyClass
})()),
(_applyDecoratedDescriptor(
  _class.prototype,
  'getSum',
  [autoCache],
  Object.getOwnPropertyDescriptor(_class.prototype, 'getSum'),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  'init',
  [_dec],
  Object.getOwnPropertyDescriptor(_class.prototype, 'init'),
  _class.prototype
)),
_class))

function callLimit() {
  var limitCallCount =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1
  var level =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warn'

  var callCount = 0

  return function(target, name, descriptor) {
    var oldValue = descriptor.value

    descriptor.value = function() {
      if (callCount < limitCallCount) {
        callCount++

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return oldValue.apply(this || {}, args)
      }
      console[level] && console[level](name, 'call limit')
    }
  }
}

function autoCache(target, name, descriptor) {
  var oldValue = descriptor.value

  var cache = null

  descriptor.value = function() {
    if (cache) {
      return cache
    } else {
      for (
        var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2]
      }

      cache = oldValue.apply(this || {}, args)

      return cache
    }
  }
  return descriptor
}
