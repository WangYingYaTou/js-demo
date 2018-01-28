const json2csv = require('json2csv')
const fs = require('fs')
const fields = ['car.make', 'car.model', 'price', 'color']
const myCars = [
  {
    car: { make: 'Audi', model: 'A3' },
    price: 40000,
    color: 'blue',
  },
  {
    car: { make: 'BMW', model: 'F20' },
    price: 35000,
    color: 'black',
  },
  {
    car: { make: 'Porsche', model: '9PA AF1' },
    price: 60000,
    color: 'green',
  },
]

const csv = json2csv({ data: myCars, fields: fields })

fs.writeFile('file.csv', csv, err => {
  if (err) throw err
  console.log('file saved')
})
