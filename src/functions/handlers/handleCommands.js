const fs = require('fs')
const {key, botId, dingGuild} = require('../../../key.json')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')


module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./src/commands`)
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'))

            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
            }
        }

        const rest = new REST({version: '9'}).setToken(key)

        try{
            await rest.put(
                //给多个guild用则使用 applicationCommand
                Routes.applicationGuildCommands(botId, dingGuild),{
                    body: client.commandArray,
                }
            )
        } catch (err){
            console.error(err)
        }
    }
}