const {SlashCommandBuilder} = require('discord.js')
const {amI} = require('../../util/lsp')

module.exports={
    data: new SlashCommandBuilder().setName("色图计数").setDescription("查看你要了多少张色图"),

    async execute(interaction, client){
        amI(interaction)
    }
}