const key = require("../key.json");
const { Client, Partials, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const Covid = require('./covid.js');
const Ding = require('./ding.js');
const Answer = require('./message/answer.js');
//const Setu = require('./util/setuLib.js')
//Music = require('./util/music_new.js');
//const Music = require('./music.js')
const Memes = require('./wordsOfDing.js')
//const Lsp = require('./util/lsp.js');
const Help = require('./commands/tools/help.js');
const { Music } = require("./util/music_new.js");


const client = new Client({
  partials: [Partials.Channel],
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.MessageContent
  ]
});
client.commands = new Collection()
client.commandArray = []
client.music = new Music()

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents()
client.handleCommands()



client.login(key.key)