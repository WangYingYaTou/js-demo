class EventEmitter {
  listeners = {}

  on(name, cb) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    const listeners = this.listeners[name]
    listeners.push(cb)
    return () => {
      const index = listeners.indexOf(cb)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
  }

  emit(name, ...args) {
    const listeners = this.listeners[name] || []
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i](...args)
    }
  }
}

class Model extends EventEmitter {
  constructor(props) {
    super(props)
    this.data = props
    this.on('change', data => {
      console.log('changed: ', data)
    })
  }

  set(key, value) {
    this.data[key] = value
    this.emit('change', `key: ${key}, value: ${value}`)
  }

  get(key) {
    return this.data[key]
  }
}

const model = new Model({ a: 1, b: 'haha', c: 'test' })
model.set('a', '100')
