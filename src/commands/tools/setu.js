const { SlashCommandBuilder } = require('discord.js')
const { setu } = require('../../util/setuLib')

module.exports = {
    data: new SlashCommandBuilder().setName("色图").setDescription("获取色图，仅在[色图][字幕组]频道"),

    async execute(interaction, client) {
        if (interaction.channel.id != 680965272588386403 && interaction.channel.id != 911548097325322240) {
            interaction.reply('在这里？不是吧阿sir')
            return
        }
        setu(interaction)
    }
}