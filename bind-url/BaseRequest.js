import { createHttpClient } from 'httpclient-module'

const P_CONTENT_TYPE = 'application/x-www-form-urlencoded'
class BaseModule {
  constructor() {
    this.$http = createHttpClient({
      headers: {
        post: { 'Content-Type': P_CONTENT_TYPE },
        put: { 'Content-Type': P_CONTENT_TYPE },
      },
    })
  }

  get(url, config = {}) {
    return this.$http.get(url, config)
  }

  post(url, data = undefined, config = {}) {
    return this.$http.post(url, data, { ...this.dataMethodDefaults, ...config })
    return this.$http.post(url, data, config)
  }

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, { ...this.dataMethodDefaults, ...config })
    return this.$http.put(url, data, config)
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config)
  }
}

export default BaseModule
