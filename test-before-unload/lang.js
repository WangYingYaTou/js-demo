const i18n = {
    loaded: false,
    res: {},
    init(host) {
        return new Promise((resolve, reject) => {
            if (this.loaded) {
                resolve(this.res)
            } else[
                utils.getScript(host, info => {
                    this.res = info
                    this.loaded = true
                    resolve(info)
                })
            ]
        })
    },
    getLang(key) {
        return this.res[key]
    },
    getLangAsync(key) {
        this.init().then(() => {
            return this.res[key]
        })
    }
}

i18n.getLangAsync().then((lang) => {
    console.log(lang)
})