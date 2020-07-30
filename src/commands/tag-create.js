module.exports = {
    name: "tag-create",
    category: "moderation",
    async execute(client, msg) {
        let vote = client.db.get(`votes.${msg.author.id}`)
        if (!vote || vote < Date.now()) return msg.reply("In order to use the tags commands, you need to vote for me! https://top.gg/bot/727163097026003004/vote")
        if (!msg.args[0]) return msg.reply("You need to provide a tag name!")
        if (!msg.args[1]) return msg.reply("You need to provide a description!")
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        let content = msg.args.slice(1).join(' ')
        if (content.length >= 2000) return msg.reply("Sorry, but the tag description needs to be smaller than 2000 characters")
        for (let i of client.commands) {
            if (msg.args[0].toLowerCase() === i[1].name || i[1].aliases && i[1].aliases.includes(msg.args[0].toLowerCase())) return msg.reply("Sorry, but you can't create a tag with this name!")
        }
        client.db.set(`tags.${msg.guild.id}.${msg.args[0]}`, content)
        msg.channel.send('Tag created!')
    }
}