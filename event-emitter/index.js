class EventEmitter {
  listeners = []

  on(cb) {
    this.listeners.push(cb)
    return () => {
      const index = this.listeners.indexOf(cb)
      if (index !== -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  emit(...args) {
    const listeners = this.listeners
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i](...args)
    }
  }
}

class Model extends EventEmitter {
  constructor(props) {
    super(props)
    this.data = props
    this.on(data => {
      console.log('changed: ', data)
    })
  }

  set(key, value) {
    this.data[key] = value
    this.emit(`key: ${key}, value: ${value}`)
  }

  get(key) {
    return this.data[key]
  }
}

const model = new Model({ a: 1, b: 'haha', c: 'test' })

model.set('a', '100')
