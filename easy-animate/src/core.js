import Tween from './tween'

class Core {
  constructor(opts) {
    this._init(opts)
    this.state = 'init'
  }

  _init(opts) {
    this._initValue(opts.value)
    this.duration = opts.duration || 1000
    this.timingFuction = opts.timingFuction || 'linear'
    this.renderFunction = opts.render

    this.onPlay = opts.onPlay
    this.onStop = opts.onStop
    this.onResume = opts.onResume
    this.onReset = opts.onReset
    this.onEnd = opts.onEnd
  }

  _initValue(value) {
    this.value = []
    value.forEach(item => {
      this.value.push({
        start: parseFloat(item[0]),
        end: parseFloat(item[1]),
      })
    })
  }

  _loop() {
    const t = Date.now() - this.beginTime
    const duration = this.duration
    const func = Tween[this.timingFuction] || Tween.linear
    if (t >= duration || this.state === 'end') {
      this._end()
    } else if (this.state === 'stop') {
      this._stop(t)
    } else if (this.state === 'init') {
      this._reset()
    } else {
      this._renderFunction(t, duration, func)
      window.requestAnimationFrame(this._loop.bind(this))
    }
  }

  _end() {
    this.state = 'end'
    this._renderEndState()
    this.onEnd && this.onEnd()
  }

  _renderEndState() {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween['linear']
    this._renderFunction(d, d, func)
  }

  end() {
    this.state === 'play' ? (this.state = 'end') : this._end()
  }

  reset() {
    this.state === 'play' ? (this.state = 'init') : this._reset()
  }

  _reset() {
    this.state = 'init'
    this._renderInitState()
    this.onReset && this.onReset()
  }

  _renderInitState() {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween['linear']
    this._renderFunction(0, d, func)
  }

  stop() {
    if (this.state === 'play') {
      this.state = 'stop'
    } else {
      // 使目标暂停，无需像end或reset那样将目标变成结束/起始状态，保持当前状态即可
      this.state = 'stop'
      this.onStop && this.onStop()
    }
  }

  _stop(t) {
    this.state = 'stop'
    this._renderStopState(t)
    this.onStop && this.onStop()
  }

  _renderStopState(t) {
    const d = this.duration,
      func = Tween[this.timingFunction] || Tween['linear']
    this._renderFunction(t, d, func)
  }

  _play() {
    this.state = 'play'

    // 新增部分
    this.onPlay && this.onPlay()

    this.beginTime = Date.now()
    const loop = this._loop.bind(this)
    window.requestAnimationFrame(loop)
  }

  _renderFunction(time, duration, func) {
    const values = this.value.map(value =>
      func(time, value.start, value.end - value.start, duration)
    )
    this.renderFunction.apply(this, values)
  }

  play() {
    this._play()
  }
}

window.Core = Core
export default Core
