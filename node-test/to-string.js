const fs = require("fs");
const mime = "image/jpeg";
const encoding = "base64";
const base64Data = fs
  .readFileSync(`${__dirname}/WechatIMG696.jpeg`)
  .toString(encoding);
const uri = `data:${mime};${encoding},${base64Data}`;
console.log(uri);


const buf = Buffer(uri.split(',')[1], 'base64');
fs.writeFileSync(`${__dirname}/secondmonkey.jpeg`, buf);