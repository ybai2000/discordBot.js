const key = require("../key.json");
const { Client, Partials, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const Covid = require('./covid.js');
const Ding = require('./ding.js');
const Answer = require('./message/answer.js');
const Setu = require('./util/setuLib.js')
//Music = require('./util/music_new.js');
// const Music = require('./music.js')
const Memes = require('./wordsOfDing.js')
const Lsp = require('./util/lsp.js');
const Help = require('./commands/tools/help.js');
const { Music } = require("./util/music_new.js");


const client = new Client({
  partials: [Partials.Channel],
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.MessageContent
  ]
});
client.commands = new Collection()
client.commandArray = []
client.music = new Music()

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents()
client.handleCommands()


// music = new Music.Music()

var recorder = {
  repet: [],
  data: [],
  channel: [],
  member: []
}
// client.once('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

client.on('messageCreate', message => {
  var author = message.author.id;
  // 也可以使用if (message.author.tag != '时区换算#7477')
  if (author == 627348371614597160) {
    return;
  }
  var txt = message.content
  //Answer.answer(txt, message);
  // if (txt.length <= 2 && (!isNaN(txt) || txt == 'c' || txt == 'a')) {
  //   let username = message.author.username
  //   if (music.user[username] != null) {
  //     music.handleSelection(message)
  //   }
  // }
  if (txt == "测试") {
    //message.channel.send('没有测试项目');


    // message.content = "播放 BV1iP4y1Y7NE"
    //   Music.music(message).catch(err=>{
    //     message.channel.send(err)
    //  })

    //
    //Music.test("BV1iP4y1Y7NE")
    //Music.find("https://www.bilibili.com/video/BV1kf4y1y7bX")
  }

  // else if (txt == "时间") {
  //   message.channel.send(Ding.dingTime());
  //   //message.channel.send(time());
  // }
  // else if (txt == "注卵") {
  //   message.channel.send('该注卵了<@135118641657020416>')
  // }
  // else if (txt == "注卵时间") {
  //   message.channel.send('<@135118641657020416>请立即注卵')
  // }
  // else if (txt.includes("溜了") || txt.includes("跑路")) {
  //   message.react('🇫🇷');
  // }
  // else if (txt == "疫情") {
  //   //Covid.getCovid(message);
  //   message.channel.send("学校统计疫情网站没了")
  // }
  // else if (txt == "色图") {
  //   //message.channel.send("色图功能暂时离线")
  //   if (message.channel.name == '字幕组' || message.channel.name == "色图") {
  //     Setu.setu(message)
  //   }
  //   else {
  //     //Setu.setu(message)
  //     message.channel.send("在这里？不是吧阿sir")
  //   }
  // }
  // else if (txt == "语录") {
  //   if (message.channel.name == '字幕组') {
  //     Memes.wordsOfDing(message)
  //   }
  //   else {
  //     message.channel.send("你要公开处刑吗")
  //   }
  // }
  // else if (txt == "猛犸") {
  //   Memes.menMa(message)
  // }
  // else if (txt == "piip") {
  //   if (message.author.id == "269259720085209099") {
  //     const http = require('https')
  //     http.get("https://checkip.amazonaws.com", (res) => {
  //       let body = ""

  //       res.on("data", (chunk) => {
  //         body += chunk
  //       })
  //       res.on("end", () => {
  //         message.author.send(body)
  //       })
  //     })
  //   }

  // }
  // else if (txt == "谁是老色批") {
  //   Lsp.lsp(message)
  // }
  // else if (txt == "我有多色批" || txt == "我有多色批？" || txt == "我有多色批?") {
  //   Lsp.amI(message)
  // }
  // else if (txt == "请教教我") {
  //   //Help.help(message)
  // }
  else if (txt[0] == '播' && txt[1] == '放' && txt[2] == ' ') {
    // Music.music(message).catch(err=>{
    //   message.channel.send(err)
    // })
    music.parseRequest(message).catch(err => {
      err = '```' + err + '```'
      message.channel.send(err)
    })
  }
  else if (txt == '播放列表' || txt == "歌单") {
    music.getQueue(message)
  }
  // else if (txt == "别唱了"){

  //}
  else if (txt == "切歌") {
    music.play(true, message)
  }
  else if (txt == "离开频道") {
    music.endConnection()
  }
  else if (txt == "进来唱歌") {
    music.newVoiceConnection(message)
  }
  else {
    //fudu(message);
  }

});



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
  if (!recorder.channel.includes(message.channel.id)) {
    recorder.channel.push(message.channel.id)
    recorder.data.push(message.content)
    recorder.member.push([message.author.id])
    recorder.repet.push(0)
  }
  else {
    var index = recorder.channel.indexOf(message.channel.id)
    if (recorder.data[index] == message.content) {
      if (!recorder.member[index].includes(message.author.id)) {
        //if (true) {
        recorder.repet[index] += 1
        recorder.member[index].push(message.author.id)
        if (recorder.repet[index] == 2) {
          message.channel.send(message.content)
          recorder.repet[index] = 0
          recorder.data[index] = ''
          recorder.member[index] = []
        }
      }
    }
    else {
      recorder.data[index] = message.content
      recorder.repet[index] = 0
      recorder.member[index] = [message.author.id]
    }
  }
}


client.login(key.key)