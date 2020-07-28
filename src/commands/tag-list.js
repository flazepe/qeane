module.exports = {
    name: "tag-list",
    category: "moderation",
    async execute (client,msg) {
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply("You need the Manage Server permission in order to do this command!")
        let tags = client.db.get(`tags.${msg.guild.id}`)
        let list = Object.keys(tags).join(', ')
        if (!list) return msg.reply("No tag have been created here!")
        msg.reply("",{embed:{
            description: list,
            title: "Tag list"
        }})
    }
}