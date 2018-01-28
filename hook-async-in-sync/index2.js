const EventEmitter = require('events')

class Program extends EventEmitter {
  constructor() {
    super()
    this.initter = []
    this.on('bootstrap', async function() {
      const initter = [].concat(this.initter)
      console.time('init')
      try {
        while (initter.length) {
          const iniFunc = initter.shift()
          await iniFunc()
        }
      } catch (err) {
        this.emit('error', err)
        return false
      }
      console.timeEnd('init')
      console.log('run')
      this.run()
    })
  }
  initial(func) {
    this.initter.push(func)
    return this
  }
  run() {}
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(100), 100)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1000), 1000)
  // setTimeout(() => reject(1000), 1000)
})

new Program()
  .initial(() => promise1)
  .initial(() => promise2)
  // bootstrap the app
  .on('error', err => {
    console.error('Something go wrong!')
    console.error(err)
  })
  .emit('bootstrap')
