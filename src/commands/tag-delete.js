module.exports = {
    name: "tag-delete",
    category: "moderation",
    async execute (client,msg) {
        if (!msg.args[0]) return msg.reply("You need to provide a tag name to delete it!!")
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        if (!client.db.has(`tags.${msg.guild.id}.${msg.args[0]}`)) return msg.reply("This tag don't exist!")
        client.db.delete(`tags.${msg.guild.id}.${msg.args[0]}`)
        msg.channel.send('Tag deleted!')
    }
}