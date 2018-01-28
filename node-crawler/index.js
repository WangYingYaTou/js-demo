const temme = require('temme').default
const axios = require('axios')
const json2csv = require('json2csv')
const fs = require('fs')

axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

function fetchJson(url, selector) {
  return axios.get(url).then(html => {
    const result = temme(html, selector)
    return result
  })
}

function saveMovies() {
  const url = 'https://movie.douban.com'
  const selector =
    '.ui-slide-item[data-title] @recentMovies { &[data-title=$title data-rate=$rate|Number]; a[href=$url]; }'
  const fields = ['title', 'rate', 'url']
  return fetchJson(url, selector).then(result => {
    const csv = json2csv({ data: result.recentMovies, fields: fields })
    fs.writeFile(`file-${Date.now()}.csv`, csv, err => {
      if (err) throw err
      console.log('file saved')
    })
  })
}

saveMovies()
// 一分钟一次
setInterval(saveMovies, 60 * 1000)
