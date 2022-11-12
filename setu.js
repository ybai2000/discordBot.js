const { Http2ServerRequest } = require('http2')
//const success = false;

module.exports.setu = async function (message) {
    var start = Date.now();
    console.log("开始发送色图")
    const http = require('https')
    //https://api.lolicon.app/#/setu?id=telegram-bot

    var url = 'https://api.lolicon.app/setu/v2?r18=2&size=regular&tag!=vtb'
    //var url = 'https://api.lolicon.app/setu/v2?size=regular&tag!=vtb'
    http.get(url, (res) => {
        let body = ""

        res.on("data", (chunk) => {
            body += chunk
        });

        res.on("end", () => {
            try {
                ;
                let json = JSON.parse(body);
                //console.log(json)
                let url = json.data[0].urls.regular
                let author = json.data[0].author
                //console.log(url)
                var get = Date.now()
                //console.log("获取json用时: ", (get-start))
                try {
                    send(message)
                    //download(url, json.data[0].pid + ";" + json.data[0].author + ".jpg", function () {
                    //    console.log('done')
                    //})
                }
                catch (err) {
                    console.log("出错")
                }

            }
            catch (error) {
                //console.error(error.message)
            };
        });
    }).on("error", (error) => {
        console.error(error.message);
    });


}

async function send(message){
    var fs = require('fs')
    var dir = fs.readdirSync("/home/pi/discord/temp/meme/setu/")
    if (dir.length == 0){
        message.channel.send("被榨干了，稍后再冲吧")
        for (var i=0; i < 10; i++){
            fillLib()
        }
        return
    }
    var rand = Math.floor(Math.random() * dir.length)
    path = "/home/pi/discord/temp/meme/setu/"+dir[rand]
    var author = dir[rand].split(";")[1].split(".")[0]
    var msg = await message.channel.send({files:[path]})
    msg.react('👍')
    msg.react('👎')
    message.channel.send('作者：' + author)
    fs.unlink(path,()=>{

    })
    if (dir.length < 70){
        fillLib()
    }

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
    var size = fs.readdirSync("/home/pi/discord/temp/meme/setu/").length
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
        await download(pic_url, "/home/pi/discord/temp/meme/setu/"+pid + ";" + author + "." + ext, function () {
            
        }).then(()=>{
            size = fs.readdirSync("/home/pi/discord/temp/meme/setu/").length
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
