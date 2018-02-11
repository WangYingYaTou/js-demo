import axios from 'axios'
import qs from 'query-string'

function isEmptyObject (obj) {
  return !obj || !Object.keys(obj).length
}

// 清理headers中不需要的属性
function clearUpHeaders (headers) {
  [
    'common',
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'options',
    'head'
  ].forEach(prop => headers[prop] && delete headers[prop])
  return headers
}

// 组合请求方法的headers
// headers = default <= common <= method <= extra
function resolveHeaders (method, defaults = {}, extras = {}) {
  method = method && method.toLowerCase()
  // check method参数的合法性
  if (!/^(get|post|put|delete|patch|options|head)$/.test(method)) {
    throw new Error(`method:${method}不是合法的请求方法`)
  }
  
  const headers = { ...defaults }
  const commonHeaders = headers.common || {}
  const headersForMethod = headers[method] || {}
  
  return _clearUpHeaders({
    ...headers,
    ...commonHeaders,
    ...headersForMethod,
    ...extras
  })
}

// 组合请求方法的config
// config = default <= extra
function resolveConfig (method, defaults = {}, extras = {}) {
  if (isEmptyObject(defaults) && isEmptyObject(extras)) {
    return {}
  }
  
  return {
    ...defaults,
    ...extras,
    resolveHeaders(method, defaults.headers, extras.headers)
  }
}

class HttpClientModule {
  constructor (options = {}) {
    const defaultHeaders = options.headers || {}
    if (options.headers) {
      delete options.headers
    }
    
    const defaultOptions = {
      baseUrl: 'https://api.forcs.com',
      transformRequest: [function (data, headers) {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          // 针对application/x-www-form-urlencoded对data进行序列化
          return qs.stringify(data)
        } else {
          return data
        }
      }]
    }
    
    this.defaultConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      	...defaultHeaders
      }
    }
    
    this.$http = axios.create({ ...defaultOptions, ...options })
  }
  
  get (url, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.get(url, resolveConfig(
        'get', this.defaultConfig, config)))
    })
  }
  
  post (url, data = undefined, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.post(url, data, resolveConfig(
        'post', this.defaultConfig, config)))
    })
  }
  
  put (url, data = undefined, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.put(url, data, resolveConfig(
        'put', this.defaultConfig, config)))
    })
  }
  
  delete (url, config = {}) {
    return new Promise((resolve) => {
      resolve(this.$http.delete(url, resolveConfig(
        'delete', this.defaultConfig, config)))
    })
  }
}


/* 请求方法与模块方法名的映射关系对象
 * key -> 请求方法
 * value -> pattern：方法名的正则表达式，sendData：表示是否是POST，PUT或者PATCH方法
 */
const methodPatternMapper = {
  get: { pattern: '^(get)\\w+$' },
  post: { pattern: '^(create)\\w+$', sendData: true },
  put: { pattern: '^(update)\\w+$', sendData: true },
  delete: { pattern: '^(delete)\\w+$' }
}

// 辅助方法，判断是否是函数
const isFunc = function (o) {
  return typeof o === 'function'
}

// 辅助方法，判断是否是plain object
// 这个方法相对简单，如果想看更加严谨的实现，可以参考lodash的源码
const isObject = function (o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/* 
 * 将http请求绑定到模块方法中
 *
 * @param method 请求方法
 * @param moduleInstance 模块实例对象或者模块类的原型对象
 * @param shouldSendData 表示是否是POST，或者PUT这类请求方法
 *
 * @return Axios请求api返回的Promise对象
 */
function bindModuleMethod(method, moduleInstance, shouldSendData) {
  return function (url, args, config = {}) {
    return new Promise(function (resolve, reject) {
      let p = undefined
      config = { ...config, url, method }
      if (args) {
        shouldSendData ?
          config.data = args :
          config.url = `${config.url}?${qs.stringify(args)}`
      }
      moduleInstance.$http.request(config)
        .then(response => resolve(response))
        .catch((error) => reject(error))
    })
  }
}

/*
 * 根据定义的模块方法名称，通过methodPatternMapper转换成绑定URL的模块方法
 *
 * @param moduleInstance 模块实例对象或者模块类的原型对象
 * @param name 模块方法名称
 *
 * @return Function 绑定的模块方法
 * @throw 方法名称和请求方法必须一一匹配
 *        如果发现匹配到的方法不止1个或者没有，则会抛出异常
 */
function resolveMethodByName(moduleInstance, name) {
  let requestMethod = Object.keys(metherPatternMapper).filter(key => {
    const { pattern } = methodPatternMapper[key]
    if (!(pattern instanceof RegExp)) {
      // methodPatternMapper每个属性的value的pattern
      // 既可以是正则表达式字符串，也可是是正则类型的对象
      pattern = new RegExp(pattern)
    }
    return pattern.test(name)
  })
  
  if (requestMethod.length !== 1) {
    throw `
      解析${name}异常，解析得到的方法有且只能有1个，
      但实际解析到的方法个数是：${requestMethod.length}
    `
  }
  
  requestMethod = requestMethod[0]
  return bindModuleMethod(requestMethod, moduleInstance,
                          methodPatternMapper[requestMethod].sendData)
}

/*
 * 将参数映射到路径变量
 * 
 * @param url
 * @param params 被映射到路径变量的参数
 * 
 * @return 将路径变量替换好的URL
 */
function mapParamsToPathVariables(url, params) {
  if (!url || typeof url !== 'string') {
    throw new Error(`url ${url} 应该是URL字符串`)
  }
  return url.replace(/:(\w+)/ig, (_, key) => params[key])
}

export function bindUrls (urls = {}) {
  // 为什么返回一个函数对象？后面会给大家解释
  return module => {
    const keys = Object.keys(urls)
    if (!keys.length) {
      console.warn('urls对象为空，无法完成URL的映射')
      return
    }
    
    const instance = module.prototype || module
    
    keys.forEach(name => {
      const url = urls[name]
      
      if (!url) {
        throw new Error(`${name}()的地址无效`)
      }
      // 根据urls对象动态定义模块方法
      Object.defineProperty(instance, name, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: ((url, func, thisArg) => () => {
          let args = Array.prototype.slice.call(arguments)
          if (args.length > 0 && url.indexOf('/:') >= 0) {
            if (isObject(args[0])) {
              const params = args[0]
              args = args.slice(1)
              url = mapParamsToPathVariables(url, params)
            }
          }
          return func && func.apply(thisArg, [ url ].concat(args))
        })(url, resolveMethodByName(instance, name), instance)
      })
    })
  }
}


// 导出工厂方法
export function createHttpClient (options, defaults) {
  return new HttpClientModule(options, defaults)
}

// 默认导出模块对象
export default HttpClientModule  // import

