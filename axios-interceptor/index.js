function xmlRequest(url, config = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const {
      method = 'GET',
      ContentType = 'application/x-www-form-urlencoded',
    } = config
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', ContentType)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = function(error) {
      reject(error)
    }
    xhr.send()
  })
}

function httpRequest(url, config = {}) {
  const http = require('http')
  return new Promise((resolve, reject) => {
    const {
      method = 'GET',
      ContentType = 'application/x-www-form-urlencoded',
    } = config

    const options = {
      hostname: 'translate.hunter.cool',
      port: 80,
      path: '/_api/lang_list?end_code=3&product=waka',
      method: method,
      headers: {
        'Content-Type': ContentType,
      },
    }
    const req = http.request(options, res => {
      res.setEncoding('utf8')
      res.on('data', chunk => {
        resolve(chunk)
      })
    })

    req.on('error', e => {
      reject(e.message)
    })
    req.end()
  })
}

function dispatchRequest(url, config) {
  if (typeof window !== 'undefined') {
    return xmlRequest(url, config)
  } else {
    return httpRequest(url, config)
  }
}

class Axios {
  constructor() {
    this.interceptors = []
  }

  request(url, config = {}) {
    const chains = [dispatchRequest, undefined]
    let promise = Promise.resolve(config)
    this.interceptors.forEach(interceptor => {
      chains.unshift(interceptor.onResolve, interceptor.onReject)
    })

    while (chains.length) {
      promise = promise.then(chains.shift(), chains.shift())
    }

    return promise
  }

  use(onResolve, onReject) {
    this.interceptors.unshift({
      onResolve: onResolve,
      onReject: onReject,
    })
  }
}

const axios = new Axios()

axios.use(
  config => {
    console.log('request use 1', config)
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(config), 1000)
    })
  },
  error => {
    console.log('request error use 1', config)
    return Promise.reject(error)
  }
)

axios.use(
  config => {
    console.log('request use 2', config)
    return config
  },
  error => {
    console.log('request error use 2', config)
    return Promise.reject(error)
  }
)

axios
  .request(
    'http://translate.hunter.cool/_api/lang_list?end_code=3&product=waka',
    {
      ContentType: 'application/x-www-form-urlencoded',
    }
  )
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })
