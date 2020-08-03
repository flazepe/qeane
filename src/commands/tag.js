module.exports = {
    name: "tag",
    category: "moderation",
    async execute(client, msg) {
        let vote = client.db.get(`votes.${msg.author.id}`)
        if (!vote || vote < Date.now()) return msg.reply("In order to use the tags commands, you need to vote for me! https://top.gg/bot/727163097026003004/vote")
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        switch (msg.args[0]) {
            case "create":
                msg.args = msg.args.slice(1)
                if (!msg.args[0]) return msg.reply("You need to provide a tag name!")
                if (!msg.args[1]) return msg.reply("You need to provide a description!")
                let content = msg.args.slice(1).join(' ')
                if (content.length >= 2000) return msg.reply("Sorry, but the tag description needs to be smaller than 2000 characters")
                for (let i of client.commands) {
                    if (msg.args[0].toLowerCase() === i[1].name || i[1].aliases && i[1].aliases.includes(msg.args[0].toLowerCase())) return msg.reply("Sorry, but you can't create a tag with this name!")
                }
                client.db.set(`tags.${msg.guild.id}.${msg.args[0]}`, content)
                msg.reply('Tag created!')
                break;
            case "delete":
                msg.args = msg.args.slice(1)
                if (!msg.args[0]) return msg.reply("You need to provide a tag name to delete it!!")
                if (!client.db.has(`tags.${msg.guild.id}.${msg.args[0]}`)) return msg.reply("This tag don't exist!")
                client.db.delete(`tags.${msg.guild.id}.${msg.args[0]}`)
                msg.reply('Tag deleted!')
                break;
            case "list":
                let tags = client.db.get(`tags.${msg.guild.id}`)
                let list = Object.keys(tags).join(', ')
                if (!list) return msg.reply("No tag have been created here!")
                msg.reply("", {
                    embed: {
                        description: list,
                        title: "Tag list"
                    }
                })
                break;
            default:
                msg.reply("Usage: `tag <create/delete/list>`")
                break;
        }
    }
}