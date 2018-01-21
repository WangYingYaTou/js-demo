var demo = new Vue({
  el: '#demo',
  data: {
    text: 'before change text',
    text2: 'before change text2',
  },
  render() {
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)]),
      this.__h__('span', {}, [this.__toString__(this.text2)]),
    ])
  },
})

setTimeout(function() {
  demo.text = 'after change text'
  demo.text2 = 'after change text2'
}, 2000)

setTimeout(function() {
  demo.text = 'after after change text'
  demo.text2 = 'after after change text2'
}, 3000)
