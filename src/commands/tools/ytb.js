const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName("ytb").setDescription("从油管播放视频").addStringOption(option =>
        option
            .setName("目标")
            .setDescription("目标视频")
            .setRequired(true)

    ),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        })


        //const target = interaction.options.getString("目标")
        try{
            client.music.parseYtb(interaction)
        } catch(err){
            err = '```' + err + '```'
            interaction.editReply(err)
        }
    }
}