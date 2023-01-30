const { isInteractionButton } = require('discord-api-types/utils/v10')
const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("leave").setDescription("使bot本体离开频道"),

    async execute(interaction, client){
        client.music.endConnection()
        interaction.reply("已离开频道")
    }
}