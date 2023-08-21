const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("从b站播放音乐")
        .addStringOption(option =>
            option
                .setName('目标')
                .setDescription("网址/bv号/av号/关键字")
                .setRequired(true)
        ),

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        })


        //const target = interaction.options.getString("目标")
        try{
            client.music.parseRequest(interaction)
        } catch(err){
            err = '```' + err + '```'
            interaction.editReply(err)
        }
    }
}