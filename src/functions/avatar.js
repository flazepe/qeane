const Discord = require('discord.js')
/**
 * Returns avatar link of a member
 * @param {Discord.GuildMember} member - Guild Member
 */
module.exports = (member) => {return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`}