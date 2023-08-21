const config = {
    host: 'localhost',
    user: 'pi',
    password: 'wang19981021',
    database: 'setu'
}

module.exports.wordsOfDing = function (message){
    // var fs = require('fs');
    // var dir = fs.readdirSync("/home/pi/discordBot/meme/wordsOfDing/")
    // var rand = Math.floor(Math.random() * dir.length)
    // path = "/home/pi/discordBot/meme/wordsOfDing/"+dir[rand]
    // message.channel.send({files: [dir]})
    send(message, "/home/pi/discordBot/meme/wordsOfDing/")
}

module.exports.menMa = function (message){
    // var fs = require('fs');
    // var dir = fs.readdirSync("/home/pi/discordBot/meme/mammoth/")
    // var rand = Math.floor(Math.random() * dir.length);
    // path = "/home/pi/discordBot/meme/mammoth/"+dir[rand]
    // message.channel.send({files:[path]})
    send(message, "/home/pi/discordBot/meme/mammoth/")
}

function send(message, src,){
    var fs = require('fs')
    var dir = fs.readdirSync(src)
    var rand = Math.floor(Math.random() * dir.length)
    path = src + dir[rand]
    message.channel.send({files:[path]})
    return path
}

addToSql = async function(table, userName){
    let mySql = require('mysql')
    let connection = mysql.createConnection(config)
    let command = `INSERT INTO wordsOfDing(userName) values('`+userName+`');`
    connection.query(command)
    connection.end()
}