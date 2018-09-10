

function delay(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

const units = [2, 3, 4, 5, 6]


function generateNoSplitPdf(units, options) {
    return new Promise(async (resolve, reject) => {
        const mapUnits = units.map(async unit => {
            console.log('await ', unit)
            const time = await delay(unit * 1000)
            console.log('time', time)
        });

        mapUnits[mapUnits.length - 1].then(() => {
            console.log(999)
        }).then(() => {
            resolve(888)
        })
    })
}

console.time('test')
generateNoSplitPdf(units).then(x => {
    console.log('x:', x)
    console.timeEnd('test')
})