const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("next").setDescription("切歌"),

    async execute(interaction, client){
        client.music.play(true, interaction)
    }
}