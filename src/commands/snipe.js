
const Discord = require('discord.js')
module.exports = {
    name: 'snipe',
    category: "moderation",
    async execute(client,msg) {
        const channel = msg.mentions.channels.first() || msg.channel
    if (!client.snipes.get(channel.id)) return msg.reply("There is nothing to snipe")
    const embed = new Discord.MessageEmbed()
   .setTitle(client.snipes.get(channel.id).user.tag+'('+client.snipes.get(channel.id).user.id+')')
    .setDescription(client.snipes.get(channel.id).content)
    .setColor("RANDOM")
    .setTimestamp(client.snipes.get(channel.id).timestamp)
    msg.reply("",embed)
    },
} 
