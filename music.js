const path = require('path')

module.exports.music = async function(message){

    
    const channel = message.member.voice.channel
    console.log(message)
    if (channel == null){

        message.channel.send('未找到频道')
        return
    }
    channel.join().then((connection) =>{
        connection.play(path.join(__dirname, 'heneforth.mp4'))
    })
    

}

    /*
    const http = require('https')
    var url = "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/60/97/268489760/268489760-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1632182843&gen=playurlv2&os=akam&oi=1234744179&trid=0e2dcba1bebb46e6b9c67586d04e67fbu&platform=pc&upsig=6bc81875e5df3b4530f1ddca799a8d0c&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&hdnts=exp=1632182843~hmac=10315c1e35db91b0a588503b50c56cf6385ac5a5fc3713a361dd627ea4c3ee33&mid=6985219&bvc=vod&nettype=0&orderid=0,1&agrr=0&logo=80000000 "

    http.get(url, (res) =>{
        let body = ""

        res.on("data", (chunk) =>{
            body += chunk
        });

        res.on("end", () =>{

        })
    })
    */