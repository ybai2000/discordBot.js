const fs = require('fs')

module.exports.send = function(interaction, src){
    var dir = fs.readdirSync(src)
    var rand = Math.floor(Math.random() * dir.length)
    path = src + dir[rand]
    interaction.reply({files:[path]})
    //return path
}