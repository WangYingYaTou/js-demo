console.time('xxx')
for (var i = 0; i < 5;) {
    setTimeout(() => {
        console.log(i)
        i += 1
    }, 0);
}
console.timeEnd('xxx')