const Discord = require('discord.js')
/**
 * Setups the client
 * @param {Discord.Client} client - The client
 */
module.exports = function (client) {
    const fs = require('fs'), config = require('../../config.json'), autoload = require('auto-load'), quick = require('quick.db-plus'), ksoft = require('@ksoft/api')

client.config = config
client.snipes = new Discord.Collection()
client.functions = autoload('./src/functions')
client.db = new quick.db('qeane')
client.ksoft = new ksoft.KSoftClient('4b9e205278059be3f1172fd5c46c5a7b6648e038')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.version = require('../../package.json').version

  var commandFiles = fs
    .readdirSync(`./src/commands`)
    .filter(file => file.endsWith('.js'));
  for (var file of commandFiles) {
    var command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    console.log(`==COMMANDS== Command succesfully loaded: ${command.name}`)
  }  
  
console.log('==SETUP== client succesfully loaded!')
}