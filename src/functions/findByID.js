const Discord = require("discord.js");
/**
 * Tries to fetch a guild member by it's ID
 * @param {Discord.Guild} guild - Discord Guild
 * @param {String} id - Snowflake
 */
module.exports = (guild,id) => {
    try {
        let member = guild.members.fetch({id: id, rest: true})
        return member
    } catch {
        return undefined
    }
}