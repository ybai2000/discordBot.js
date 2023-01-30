const { EmbedBuilder, Attachment, AttachmentBuilder } = require('discord.js');
const { Http2ServerRequest } = require('http2');
const Lsp = require('./lsp.js');
const fs = require('fs')
//const success = false;

module.exports.setu = async function (interaction) {
    
    Lsp.add_lsp(interaction)
    //https://api.lolicon.app/#/setu?id=telegram-bot

    var url = 'https://api.lolicon.app/setu/v2?r18=2&size=regular'
    //var url = 'https://api.lolicon.app/setu/v2?size=regular&tag!=vtb'
    send(interaction)


}

async function send(interaction){
    const message = await interaction.deferReply({
        fetchReply: true
    })
    var dir = fs.readdirSync("/home/pi/botData/setu//")
    if (dir.length == 0){
        interaction.reply("被榨干了，稍后再冲吧")
        for (var i=0; i < 10; i++){
            fillLib()
        }
        return
    }
    var rand = Math.floor(Math.random() * dir.length)
    path = "/home/pi/botData/setu//"+dir[rand]
    var author = dir[rand].split(";")[1].split(".")[0]
    var pid = dir[rand].split(";")[0]
    //var msg = await message.channel.send({files:[path]})

    const file = new AttachmentBuilder(path)
    
    const embed = new EmbedBuilder()
    .setTitle("https://www.pixiv.net/artworks/"+pid)
    .setDescription("作者："+author)
    //.setImage('attachment://setu.png')
    //var msg = await message.channel.send({embeds:[embed], files:[path]})
    // msg.react('👍')
    // msg.react('👎')
    interaction.editReply({embeds:[embed], files:[file]}).then(msg =>{
        // msg.react('👍')
        // msg.react('👎')
        fs.unlink(path, ()=>{})
        if (dir.length < 70){
            fillLib()
        }
    })
    //message.channel.send('作者：' + author)


}

/*
async function send(message, url, author) {
    var success = false
    var i = 0
    console.log("开始尝试发送")
    var start = Date.now()
    while (!success) {
        success = true
        msg = await message.channel.send(url).catch(err => {
            //console.error("unhandledRejection")  //message.channel.send("卡了")
            success = false
            i++
        })

    }
    msg.react('👍')
    msg.react('👎')
    message.channel.send('作者：' + author)
    var end = Date.now()
    console.log("发送用时: ", (end - start));
    console.log("发送失败次数: ", i, "\n")

}
*/



async function fillLib() {
    const http = require('https')
    //https://api.lolicon.app/#/setu?id=telegram-bot

    var url = 'https://api.lolicon.app/setu/v2?r18=2&size=regular&tag!=vtb'
    //var url = 'https://api.lolicon.app/setu/v2?size=regular&tag!=vtb'
    const fs = require('fs')
    var size = fs.readdirSync("/home/pi/botData/setu//").length
    while (size < 100) {
        var pic_url = ""
        var author = ""
        var pid = ""
        var ext = ""
        console.log("色图库存数: "+size)
        await new Promise((resolve)=> http.get(url, (res) => {
            let body = ""

            res.on("data", (chunk) => {
                body += chunk
            });

            res.on("end", () => {
                var json = JSON.parse(body)
                pic_url = json.data[0].urls.regular
                author = json.data[0].author
                pid = json.data[0].pid
                ext = json.data[0].ext
                
                resolve()
            })
        }))
        await download(pic_url, "/home/pi/botData/setu//"+pid + ";" + author + "." + ext, function () {
            
        }).then(()=>{
            size = fs.readdirSync("/home/pi/botData/setu//").length
        })
    }
}


async function download  (url, path, callback){
    const http = require('https')
    const fs = require('fs')
    var success = false
    while (!success) {
        var imgData = ""
        await new Promise((resolve)=> {var req = http.get(url, function (res){
            res.setEncoding("binary")
            res.on("data", function (chunk){
                imgData += chunk;
            });
            res.on("end", function(){
                success = true
                resolve()
            })
            res.on("error", function(err){
                success = false
                resolve()
            })
        })
        req.on("error", function(err){
            success = false
            resolve()
        })
    
    }).catch(err=>{
            success = false
        })

    }
    await new Promise ((resolve) =>{
        fs.writeFile(path, imgData, "binary", function (err){
            if(err){
                success = false
                resolve()
            }
            else{
                success = true
                resolve()
            }
        })
    })
}
