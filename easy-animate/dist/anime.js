/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(1);


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
    const func = __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */][this.timingFuction] || __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */].linear
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
      func = __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */][this.timingFunction] || __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */]['linear']
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
      func = __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */][this.timingFunction] || __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */]['linear']
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
      func = __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */][this.timingFunction] || __WEBPACK_IMPORTED_MODULE_0__tween__["a" /* default */]['linear']
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
/* harmony default export */ __webpack_exports__["default"] = (Core);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * Get effect on 'http://easings.net/zh-cn'
 */

const Tween = {
  linear: function(t, b, c, d) {
    return c * t / d + b
  },
  // Quad
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b
  },
  easeOut: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  },
  easeInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * (--t * (t - 2) - 1) + b
  },
  // Cubic
  easeInCubic: function(t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  easeOutCubic: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  easeInOutCubic: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
    return c / 2 * ((t -= 2) * t * t + 2) + b
  },
  // Quart
  easeInQuart: function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b
  },
  easeOutQuart: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeInOutQuart: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  },
  // Quint
  easeInQuint: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  easeOutQuint: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  easeInOutQuint: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  },
  // Sine
  easeInSine: function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  },
  easeOutSine: function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b
  },
  easeInOutSine: function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
  },
  // Expo
  easeInExpo: function(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },
  easeOutExpo: function(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  },
  easeInOutExpo: function(t, b, c, d) {
    if (t == 0) return b
    if (t == d) return b + c
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
  },
  // Circ
  easeInCirc: function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },
  easeOutCirc: function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },
  easeInOutCirc: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },
  // Elastic
  easeInElastic: function(t, b, c, d, a, p) {
    let s
    if (t == 0) return b
    if ((t /= d) == 1) return b + c
    if (typeof p == 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      s = p / 4
      a = c
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p)
      ) + b
    )
  },
  easeOutElastic: function(t, b, c, d, a, p) {
    let s
    if (t == 0) return b
    if ((t /= d) == 1) return b + c
    if (typeof p == 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) +
      c +
      b
    )
  },
  easeInOutElastic: function(t, b, c, d, a, p) {
    let s
    if (t == 0) return b
    if ((t /= d / 2) == 2) return b + c
    if (typeof p == 'undefined') p = d * (0.3 * 1.5)
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p)) +
        b
      )
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) *
        0.5 +
      c +
      b
    )
  },
  // Back
  easeInBack: function(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  easeOutBack: function(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  easeInOutBack: function(t, b, c, d, s) {
    if (typeof s == 'undefined') s = 1.70158
    if ((t /= d / 2) < 1)
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  // Bounce
  easeInBounce: function(t, b, c, d) {
    return c - Tween.easeOutBounce(d - t, 0, c, d) + b
  },
  easeOutBounce: function(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    }
  },
  easeInOutBounce: function(t, b, c, d) {
    if (t < d / 2) {
      return Tween.easeInBounce(t * 2, 0, c, d) * 0.5 + b
    } else {
      return Tween.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
  },
}

/* harmony default export */ __webpack_exports__["a"] = (Tween);


/***/ })
/******/ ]);