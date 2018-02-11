## axios 的钩子挺好用的，在钩子里可以返回 promise，在发出请求前，可以做一些异步的任务，等异步的任务完成后，再发出请求

### Interceptors

You can intercept requests or responses before they are handled by then or catch.

```
// Add a request interceptor
axios.interceptors.request.use(function (config) {
// Do something before request is sent
return config;
}, function (error) {
// Do something with request error
return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
// Do something with response data
return response;
}, function (error) {
// Do something with response error
return Promise.reject(error);
});
If you may need to remove an interceptor later you can.

var myInterceptor = axios.interceptors.request.use(function () {/_..._/});
axios.interceptors.request.eject(myInterceptor);
You can add interceptors to a custom instance of axios.

var instance = axios.create();
instance.interceptors.request.use(function () {/_..._/});
```
