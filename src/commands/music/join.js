const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("join").setDescription("使bot本体加入频道"),

    async execute(interaction, client){
        client.music.newVoiceConnection(interaction.member.voice.channel, interaction.guild)
        interaction.reply("已加入频道")
    }
}