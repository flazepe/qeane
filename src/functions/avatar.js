const Discord = require('discord.js')
/**
 * Returns avatar link of a member
 * @param {Discord.user} member - Guild Member
 */
module.exports = (user) => { return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048` }