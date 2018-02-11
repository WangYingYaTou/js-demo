class Axios {
  constructor() {
    super()
    this.interceptors = {
      request: [],
      response: [],
    }
  }

  request(url, config) {}
}
