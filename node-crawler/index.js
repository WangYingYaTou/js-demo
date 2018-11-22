const temme = require("temme").default;
const axios = require("axios");
const json2csv = require("json2csv");
const fs = require("fs");
const path = require("path");
var cheerio = require("cheerio");

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function fetchJson(url) {
  debugger;

  return axios
    .get(url)
    .then(html => {
      var $ = cheerio.load(html, { decodeEntities: false });
      debugger;
      if ($(".ma_h1") && $(".ma_h1")[0]) {
        return "https://www.qichacha.com" + $(".ma_h1")[0].attribs.href;
      } else {
        return Promise.reject("查不到");
      }
    })
    .catch(error => {
      debugger;
      console.log("出错了！");
    });
}

// https://baike.baidu.com/item/%E5%A4%A7%E8%BF%9E%E6%B1%87%E8%AF%9A%E5%BE%81%E4%BF%A1%E7%AE%A1%E7%90%86%E9%A1%BE%E9%97%AE%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8

const list = fs
  .readFileSync(path.join(__dirname, "./data.txt"), { encoding: "utf-8" })
  .split("\n");

let obj = {};

async function saveMovies() {
  console.log(list);

  for (let i in list) {
    const item = list[i];
    const url = encodeURI(`https://www.qichacha.com/search?key=${item}`);

    await fetchJson(url).then(result => {
      axios.get(result).then(html => {
        var $ = cheerio.load(html, { decodeEntities: false });
        const tds = $(".ntable tr td", "#Cominfo");
        tds.each((idx, ele) => {
          if ($(ele).text() === "统一社会信用代码：") {
            obj[item] = $(tds[idx + 1]).text();
          }
        });
      });
    });
  }
}

saveMovies().then(() => {
  console.log(obj);
});
