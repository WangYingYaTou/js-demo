// npm i -g promises-aplus-tests

// const promise = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve(5)
//   }, 2000)
// })

class Promise {
  constructor(executor) {
    function resolve(value) {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    }

    function reject(reason) {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    }
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    this.status = 'pending'
    this.value = undefined

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    let promise2

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved =
      typeof onResolved === 'function' ? onResolved : function(value) {}
    onRejected =
      typeof onRejected === 'function' ? onRejected : function(reason) {}

    if (this.status === 'resolved') {
      return (promise2 = new Promise((resolve, reject) => {
        try {
          let x = onResolved(this.value)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
          resolve(x)
        } catch (e) {
          reject(e)
        }
      }))
    }

    if (this.status === 'rejected') {
      return (promise2 = new Promise((resolve, reject) => {
        try {
          let x = onRejected(this.value)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
          resolve(x)
        } catch (e) {
          reject(e)
        }
      }))
    }
    if (this.status === 'pending') {
      return (promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallback.push(function(value) {
          try {
            var x = onResolved(this.value)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallback.push(function(reason) {
          try {
            var x = onRejected(this.value)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      }))
    }
  }
}
