class MyClass {
  @autoCache
  getSum() {
    console.log('calculate')
    return Math.pow(3, 12)
  }

  @callLimit(1)
  init() {
    console.log('init')
  }
}

function callLimit(limitCallCount = 1, level = 'warn') {
  let callCount = 0

  return function(target, name, descriptor) {
    var oldValue = descriptor.value

    descriptor.value = function(...args) {
      if (callCount < limitCallCount) {
        callCount++

        return oldValue.apply(this || {}, args)
      }
      console[level] && console[level](name, 'call limit')
    }
  }
}

function autoCache(target, name, descriptor) {
  var oldValue = descriptor.value

  let cache = null

  descriptor.value = function(...args) {
    if (cache) {
      return cache
    } else {
      cache = oldValue.apply(this || {}, args)

      return cache
    }
  }
  return descriptor
}
