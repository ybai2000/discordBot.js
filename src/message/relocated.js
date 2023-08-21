const command = ["猛犸", "语录", "时间", "播放", "切歌", "色图"]

module.exports.relocated = function(message){
    let text = message.content
    if(command.includes(text)){
        message.channel.send("大部分功能已转移至'/ + 命令'")
        return true
    }
    return false
}