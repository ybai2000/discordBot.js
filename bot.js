
const Discord = require('discord.js');
const Covid = require('./covid.js');
const Ding = require('./ding.js');
const Answer = require('./answer.js');
const Setu = require('./setu.js');
const Music = require('./music.js')
const Memes = require('./wordsOfDing.js')
const client = new Discord.Client();

var recorder = {
  repet : [],
  data : [],
  channel : [],
  member : []
}
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  var author = message.author.id;
  // 也可以使用if (message.author.tag != '时区换算#7477')
  if (author == 627348371614597160){
    return;
  }
  var txt = message.content
  Answer.answer(txt, message);
  if (message == "测试"){

    //console.log("start test")
    // Setu.fillLib()
    message.channel.send('没有测试项目');
    
    //Music.music(message)
  }
  
  if (message == "时间") {
    message.channel.send(Ding.dingTime());
    //message.channel.send(time());
  }
  else if (message == "注卵") {
    message.channel.send('该注卵了<@135118641657020416>')
  }
  else if (message == "注卵时间") {
    message.channel.send('<@135118641657020416>请立即注卵')
  }
  else if (txt.includes("溜") || txt.includes("跑路")) {
    message.react('🇫🇷');
  }
  else if (message == "疫情"){
    Covid.getCovid(message);
  }
  else if (message == "色图" ){
    //message.channel.send("色图功能暂时离线")
    if(message.channel.name == '字幕组' || message.channel.name == "色图"){
      Setu.setu(message)
    }
    else{
      message.channel.send("在这里？不是吧阿sir")
    }
  }
  else if (message == "语录"){
    if (message.channel.name == '字幕组'){
      Memes.wordsOfDing(message)
    }
    else{
      message.channel.send("你要公开处刑吗")
    }
  }
  else if (message == "猛犸"){
    Memes.menMa(message)
  }
  else if (message == "piip"){
    if(message.author.id == "269259720085209099"){
      const http = require('https')
    http.get("https://checkip.amazonaws.com", (res)=>{
      let body = ""

      res.on("data", (chunk)=>{
        body += chunk
      })
      res.on("end", ()=>{
        message.author.send(body)
      })
    })
    }
    else{
      message.channel.send("您配吗？")
    }
    
  }
  else {
      fudu(message);
  }

});

client.login('NjI3MzQ4MzcxNjE0NTk3MTYw.XY7qFg.Ao3wLnkiTTegot9Co7_5fsSYSpY')

function time() {

  date = new Date();
  if (date.getMinutes() < 10) {
    var min = '0' + date.getMinutes();
  }
  else {
    var min = date.getMinutes();
  }
  var westH = date.getHours() - 3;
  if (westH < 0) {
    westH = westH + 24;
  }
  var spanH = date.getHours() + 6;
  if (spanH >= 24) {
    spanH = spanH - 24;
  }
  var chinaH = date.getHours() + 13;
  if (chinaH >= 24) {
    chinaH = chinaH - 24;
  }

  var eastT = '美东时间：' + date.getHours() + ': ' + min;
  var westT = '美西时间：' + westH + ': ' + min;
  var spanT = '巴塞罗那时间：' + spanH + ': ' + min;
  var chinaT = '中国时间：' + chinaH + ': ' + min;
  return eastT + '\n' + westT + '\n' + spanT + '\n' + chinaT
}

function fudu(message) {
  if(!recorder.channel.includes(message.channel.id)){
    recorder.channel.push(message.channel.id)
    recorder.data.push(message.content)
    recorder.member.push([message.author.id])
    recorder.repet.push(0)
  }
  else{
    var index = recorder.channel.indexOf(message.channel.id)
    if(recorder.data[index] == message.content){
      // if(!recorder.member[index].includes(message.author.id)){
      if(true){
        recorder.repet[index]+=1
        recorder.member[index].push(message.author.id)
        if (recorder.repet[index] == 2){
          message.channel.send(message.content)
          recorder.repet[index] = 0
          recorder.data[index] = ''
          recorder.member[index] = []
        }
      }
    }
    else{
      recorder.data[index] = message.content
      recorder.repet[index] = 0
      recorder.member[index] = [message.author.id]
    }
  }
  console.log(recorder)
}


