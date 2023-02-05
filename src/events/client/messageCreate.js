const {france} = require('../../message/france')
const {fudu} = require('../../message/fudu')
const {answer} = require('../../message/answer')
const {musicSelection} = require('../../message/musicSelection')
const {relocated} = require('../../message/relocated')

module.exports = {
    name: 'messageCreate',

    async execute(interaction, client){
        const author = interaction.author.id
        if (author == 627348371614597160) return
        if (relocated(interaction)) return
        if (musicSelection(interaction, client)) return
        if (answer(interaction)) return
        if (france(interaction)) return

        fudu(interaction)
    }
}