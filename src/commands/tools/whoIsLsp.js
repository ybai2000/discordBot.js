const {SlashCommandBuilder} = require('discord.js')
const {lsp} = require('../../util/lsp')

module.exports={
    data: new SlashCommandBuilder().setName("老色批").setDescription("查看谁要了最多的色图"),

    async execute(interaction, client){
        lsp(interaction)
    }
}