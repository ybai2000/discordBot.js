module.exports.help = function(message){
    const {EmbedBuilder} = require('discord.js')
    var msg =   "\
            测试\n当前在测试的项目\n\n\
            时间\n获取当前的丁历时间\n\n\
            注卵/注卵时间\n请狗CJ注卵\n\n\
            消息中包含[溜了/跑路]\n获得法国国旗\n\n\
            色图[色图频道]\n获取一张色图\n\n\
            谁是老色批\n获取色图索取排名\n\n\
            我有多色批\n获取自己索要色图数\n\n\
            语录[私密频道]\n获取群友语录\n\n\
            猛犸\n获取一张猛犸图\n\n\
            播放[空格]网址/BV号\n 可从b站播放音频"
    const embed = new EmbedBuilder()
    .setDescription(msg)
    message.channel.send({embeds:[embed]})
}