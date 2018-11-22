
const STATUS = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

class EasyPromise {
    constructor(fn) {
        this.status = STATUS.pending
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        fn(this.resolve, this.reject)
    }

    resolve(data) {
        this.status = STATUS.RESOLVED
        this.thenCb && this.thenCb(data)
    }

    reject(error) {
        this.status = STATUS.REJECTED
        this.catchCb && this.catchCb(error)
    }

    then(cb) {
        this.thenCb = cb
        return new EasyPromise()
    }

    catch(cb) {
        this.catchCb = cb
        return new EasyPromise()
    }

}



const p = new EasyPromise((resolve, reject) => {
    console.log('啦啦啦啦')
    setTimeout(() => {
        console.log('resolve 2000')
        resolve(300)
    }, 2000);
}).then(data => {
    console.log('then', data)
})

p.then(() => {
    console.log('then1')
    return 123
}).then(data => {
    console.log('then2 , data:', data)
    return Promise.reject('456')
}).catch(error => {
    console.error('catch error', error)
})
