var fs = require('fs'),
  byline = require('byline')
var json2csvStream = require('json2csv-stream')

var parser = new json2csvStream({ showHeader: false })

parser.on('header', function(data) {
  console.log(' ++ yeah header found ++')
  console.log(data)
})

parser.on('line', function(data) {
  console.log(' ++ yeah line found ++')
  console.log(data)
})

const input = fs.createReadStream('./temp.json', { encoding: 'utf8' })
const output = fs.createWriteStream('./temp.csv', { encoding: 'utf8' })

const bylineInput = byline.createStream(input)

const stream = bylineInput.pipe(parser).pipe(output)

stream.on('data', function(line) {
  console.log(line)
})
