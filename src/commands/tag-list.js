module.exports = {
    name: "tag-list",
    category: "moderation",
    async execute(client, msg) {
        let vote = client.db.get(`votes.${msg.author.id}`)
        if (!vote || vote < Date.now()) return msg.reply("In order to use the tags commands, you need to vote for me! https://top.gg/bot/727163097026003004/vote")

        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        let tags = client.db.get(`tags.${msg.guild.id}`)
        let list = Object.keys(tags).join(', ')
        if (!list) return msg.reply("No tag have been created here!")
        msg.reply("", {
            embed: {
                description: list,
                title: "Tag list"
            }
        })
    }
}