const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("queue").setDescription("显示播放列表"),

    async execute(interaction, client){
        client.music.getQueue(interaction)
    }
}