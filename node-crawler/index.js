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
  return axios
    .get(url)
    .then(html => {
      var $ = cheerio.load(html, { decodeEntities: false });
      if ($(".ma_h1") && $(".ma_h1")[0] && $(".ma_h1")[0].attribs.href) {
        return "https://www.qichacha.com" + $(".ma_h1")[0].attribs.href;
      } else {
        return Promise.reject("查不到");
      }
    })
    .catch(error => {
      console.error("请求出错了！");
      return Promise.reject(error);
    });
}

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
      console.log("realUrl: ", result);
      return axios
        .get(result)
        .then(html => {
          var $ = cheerio.load(html, { decodeEntities: false });
          const tds = $(".ntable tr td", "#Cominfo");
          let hasInfo = false;
          tds.each((idx, ele) => {
            if ($(ele).text() === "统一社会信用代码：") {
              hasInfo = true;
              obj[item] = $(tds[idx + 1]).text();
              console.log(`finished ${item}：${obj[item]}`);
            }
          });

          if (!hasInfo) {
            return Promise.reject("没有找到统一社会需用代码");
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}

saveMovies().then(() => {
  console.log(obj);
});
