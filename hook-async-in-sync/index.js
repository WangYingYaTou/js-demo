const EventEmitter = require('events')

class Program extends EventEmitter {
  constructor() {
    super()
    this.on('bootstrap', function() {
      console.log('run')
      this.run()
    })
  }
  run() {}
}

new Program()
  // bootstrap the app
  .on('error', err => {
    console.error('Something go wrong!')
    console.error(err)
  })
  .emit('bootstrap')
