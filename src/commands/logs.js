module.exports = {
    name: "logs",
    category: "setup",
    async execute(client, msg) {
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        let channel = msg.mentions.channels.first()
        if (!msg.args.join(' ') || !channel) return msg.reply("Usage: ``logs <#channel>``")
        client.db.set(`logs.${msg.guild.id}`, channel)
        msg.reply(`Logs channel succesfully set to ${channel}!`)
    }
}