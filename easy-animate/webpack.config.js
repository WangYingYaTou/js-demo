const path = require('path')

module.exports = {
  entry: './src/core.js',
  output: {
    filename: 'anime.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
