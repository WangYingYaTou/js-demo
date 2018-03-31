// 先全部编译，再执行的版本
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
      let code = "var string= '';\n"
      data
        .split(/\n/)
        .filter(line => Boolean(line))
        .forEach(line => {
          if (line.match(/^#(.*)/)) {
            return
          } else if (line.match(/^\+(.*)/)) {
            code += `string += "${line.match(/^\+(.*)/)[1]}";\n`
          } else if (line.match(/^-(.*)/)) {
            let len = -Number(line.match(/^-(.*)/)[1])
            code += `string = string.slice(0, ${len});\n`
          } else if (line.match(/^print/)) {
            code += 'console.log(string);\n'
          } else {
            throw new Error('无法解析')
          }
        })
      return code
    })
    .then(code => {
      console.log(code)
      // 将编译成 js 的代码写入文件
      // fs.writeFile('./hello-world.js', code, 'utf-8')
      eval(code)
    })
    .catch(error => {
      console.log(error)
    })
}

compile('./hello-world.qs')
