const {SlashCommandBuilder} = require('discord.js')

module.exports={
    data: new SlashCommandBuilder().setName("注卵").setDescription("提醒狗CJ注卵"),

    async execute(interaction, client){
        interaction.reply('该注卵了<@135118641657020416>')
    }
}