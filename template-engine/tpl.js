function compile(selector, data) {
  var tplStr = document.querySelector(selector).innerHTML
  tplStr = tplStr.replace(/<%=(.*?)%>/g, function(match, p1) {
    return data[p1]
  })
  return tplStr
}

var data = {
  name:
    '风暴降生丹妮莉丝，不焚者，弥林的女王，安达尔人，洛伊拿人和先民的女王，七国统治者暨全境守护者，大草海的卡丽熙，奴隶解放者，龙之母，跟男下属通奸者，卡奥终结者，寡妇制造者，寡妇村纵火者。',
  age: 28,
  weibo_name: '大飚哥带路',
  weibo_url: 'https://weibo.com/u/6257076674',
}

document.getElementById('app').innerHTML = compile('#tpl_profile', data)
