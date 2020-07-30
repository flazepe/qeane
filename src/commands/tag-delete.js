module.exports = {
    name: "tag-delete",
    category: "moderation",
    async execute(client, msg) {
        let vote = client.db.get(`votes.${msg.author.id}`)
        if (!vote || vote < Date.now()) return msg.reply("In order to use the tags commands, you need to vote for me! https://top.gg/bot/727163097026003004/vote")

        if (!msg.args[0]) return msg.reply("You need to provide a tag name to delete it!!")
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        if (!client.db.has(`tags.${msg.guild.id}.${msg.args[0]}`)) return msg.reply("This tag don't exist!")
        client.db.delete(`tags.${msg.guild.id}.${msg.args[0]}`)
        msg.reply('Tag deleted!')
    }
}