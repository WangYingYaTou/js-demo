const fs = require('fs')
const { promisify } = require('util')

const readFilePromise = promisify(fs.readFile)

// # 代表注释
// + 表示添加文本
// -N 表示删除 N 个字符
// print 打印文本

function compile(path) {
  readFilePromise(path, 'utf-8')
    .then(data => {
      let text = ''
      data
        .split(/\n/)
        .filter(line => Boolean(line))
        .forEach(line => {
          if (line.match(/^#(.*)/)) {
            return
          } else if (line.match(/^\+(.*)/)) {
            text += line.match(/^\+(.*)/)[1]
          } else if (line.match(/^-(.*)/)) {
            text = text.slice(0, -Number(line.match(/^-(.*)/)[1]))
          } else if (line.match(/^print/)) {
            console.log(text)
          }
        })
    })
    .catch(error => {
      console.log(error)
    })
}

compile('./hello-world.qs')
