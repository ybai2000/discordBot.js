const {SlashCommandBuilder} = require('discord.js')
const {send} = require('../../util/sendMeme')

module.exports={
    data: new SlashCommandBuilder().setName("语录").setDescription("获取群友语录，仅在[字幕组]频道"),

    async execute(interaction, client){
        if(interaction.channel.id!= 680965272588386403){
            interaction.reply('你要公开处刑吗？')
            return
        }
        send(interaction, '/home/pi/discordBot/meme/wordsOfDing/')
    }
}