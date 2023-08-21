const {SlashCommandBuilder} = require('discord.js')
const {send} = require('../../util/sendMeme')

module.exports={
    data: new SlashCommandBuilder().setName("猛犸").setDescription("获取猛犸梗图"),

    async execute(interaction, client){
        send(interaction, '/home/pi/discordBot/meme/mammoth/')
    }
}