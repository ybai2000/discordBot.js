const path = require('path')
//https://github.com/SocialSisterYi/bilibili-API-collect

module.exports.music = async function (message) {
    var bv = message.content.split(" ")[1]
    var source = await getSource(bv)
    const Voice = require('@discordjs/voice')

    const channel = message.member.voice.channel
    if (channel == null) {
        throw "你先进个频道"
    }


    //message.channel.send("若没有开始播放可能是因为走了国内的CDN导致403了，可以再试一次")
    const connection = Voice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    })

    //await new Promise(resolve => setTimeout(resolve, 10))
    var audio = Voice.createAudioResource(source)
    const player = Voice.createAudioPlayer()

    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
    });
    player.on('stateChange', (oldState, newState) => {
        console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
    });
    player.play(audio)
    connection.subscribe(player)

    // channel.join().then((connection) =>{
    //     connection.play(path.join(__dirname, 'heneforth.mp4'))
    // })


}

async function getSource(str) {
    var info = await handleInput(str)
    var av = info[0]
    var cids = info[1]
    var cid = cids[0]
    //https://api.bilibili.com/x/player/playurl?fnval=80&avid={a}&cid={c} 
    //https://www.bilibili.com/read/cv9113313
    var base = "https://api.bilibili.com/x/player/playurl?fnval=80&avid="
    var arg = base + av + "&cid=" + cid
    const urlToOptions = require('url-to-options')
    var options = urlToOptions(new URL(arg))
    options.referer = "https://www.bilibili.com"
    options.headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0"
    }
    // var options = {
    //     Scheme: "https",
    //     Host: "api.bilibili.com",
    //     Filename: "/x/playerlplayurl",
    //     fnval:80,
    //     avid:av,
    //     cid:cid
    // }
    const http = require('https')
    var audioUrl = ""
    var success = false
    for (var i = 0; i < 5 && success == false; i++) {
        await new Promise((resolve) => http.get(options, (res) => {
            let body = ""

            res.on("data", (chunk) => {
                body += chunk
            })

            res.on("end", () => {
                var json = JSON.parse(body)
                audioUrl = json.data.dash.audio[0].base_url
                if(!audioUrl.includes("upos-sz-mirrorcosov")){
                    success = true
                }
                resolve()
            })

        }))
    }
    //console.log(audioUrl)
    return audioUrl

}

async function handleInput(str){
    var res = []
    if (!str.includes("www.bilibili") && !str.includes("BV")){
        throw "网址或BV号有误"
    }
    if (str.includes("www.bilibili")){
        if (!str.includes("https")){
            str = "https://" + str
        }
        return await findcid(str)
    }
    else{
        str = "https://www.bilibili.com/video/"+str

        return await findcid(str)
    }
}

async function findcid(url) {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    const webPage = await fetch(url)
    var aid_expr = /"aid":\d+/
    var cid_expr = /"pages":\[.+?\]/
    var content = await webPage.text()
    var cid = content.match(cid_expr)
    var aid = content.match(aid_expr)
    var res = []
    if (cid == null) {
        throw "网址或BV号有误"
    }
    var json = JSON.parse("{" + cid + "}")

    for (var i in json.pages) {
        res.push(json.pages[i].cid)
    }
    return [aid[0].split(":")[1], res]
}


/*
作者：mcfx
链接：https://www.zhihu.com/question/381784377/answer/1099438784
来源：知乎著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
/*Python to JavaScript：Mannix_Wu
QQ:3068758340
E-mail:Steveandjobs3068758340@gmail.com
如果要使用这段代码请保留这两个注释*/
var table = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
var tr = {};
for (let i = 0; i < 58; i++) {
    tr[table[i]] = i;
}
var s = [11, 10, 3, 8, 4, 6];
var xor = 177451812,
    add = 8728348608;

function dec(x) {
    var r = 0;
    for (let i = 0; i < 6; i++) {
        r += tr[x[s[i]]] * Math.pow(58, i);
    }
    return (r - add) ^ xor;
}

function enc(x) {
    x = (x ^ xor) + add;
    var r = "BV1  4 1 7  ".split("");
    for (let i = 0; i < 6; i++) {
        r[s[i]] = table[Math.floor(x / Math.pow(58, i)) % 58];
    }
    return r.join("");
}

