实现类似 axios 拦截器一样的功能，可以在代码里任意注册 n 个拦截器，每次发起执行的时候，拦截器按注册的顺序依次执行，拦截器可以是异步行为

```
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

// 触发拦截器
axios.request(url)
```
