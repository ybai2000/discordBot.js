const { fillLib } = require('./setu')

module.exports.wordsOfDing = function (message){
    // var fs = require('fs');
    // var dir = fs.readdirSync("/home/pi/discord/temp/meme/wordsOfDing/")
    // var rand = Math.floor(Math.random() * dir.length)
    // path = "/home/pi/discord/temp/meme/wordsOfDing/"+dir[rand]
    // message.channel.send({files: [dir]})
    send(message, "/home/pi/discord/temp/meme/wordsOfDing/")
}

module.exports.menMa = function (message){
    // var fs = require('fs');
    // var dir = fs.readdirSync("/home/pi/discord/temp/meme/mammoth/")
    // var rand = Math.floor(Math.random() * dir.length);
    // path = "/home/pi/discord/temp/meme/mammoth/"+dir[rand]
    // message.channel.send({files:[path]})
    send(message, "/home/pi/discord/temp/meme/mammoth/")
}

function send(message, src,){
    var fs = require('fs')
    var dir = fs.readdirSync(src)
    var rand = Math.floor(Math.random() * dir.length)
    path = src + dir[rand]
    message.channel.send({files:[path]})
    return path
}