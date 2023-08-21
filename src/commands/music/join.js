const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("join").setDescription("使bot本体加入频道"),

    async execute(interaction, client){
        try{
            client.music.newVoiceConnection(interaction.member.voice.channel, interaction.guild)
        }
        catch(err){
            let embed = new EmbedBuilder().setDescription(err)
            interaction.reply({ embeds: [embed], components: [] })
            return
        }
        
        interaction.reply("已加入频道")
    }
}