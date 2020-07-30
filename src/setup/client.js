const Discord = require('discord.js')
/**
 * Setups the client
 * @param {Discord.Client} client - The client
 */
module.exports = function (client) {
  const fs = require('fs'), config = require('../../config.json'), autoload = require('auto-load'), quick = require('quick.db-plus'), ksoft = require('@ksoft/api')

  client.queue = new Discord.Collection()
  client.config = config
  client.functions = autoload('./src/functions')
  client.db = new quick.db('qeane')
  client.ksoft = new ksoft.KSoftClient(require('../../config.json').ksoft)
  client.commands = new Discord.Collection()
  client.aliases = new Discord.Collection()
  client.version = require('../../package.json')["last-update"]

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