function delay(m) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(m);
    }, m);
  });
}

async function test() {
  let list = [1, 2, 3];
  for (let i in list) {
    await delay(1000);
    console.log("123");
  }
}

test();
