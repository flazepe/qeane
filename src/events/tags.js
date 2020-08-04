module.exports = async (client, msg) => {
    if (!client.config.ownerID.includes(msg.author.id)) {
        if (!msg.member.permissions.has("MANAGE_GUILD")) return;
    }
    if (msg.mentions.members.first()) {
        if (msg.args.contains("-d")) msg.delete()
        let x = await msg.reply("", {
            embed: {
                description: client.db.get(`tags.${msg.guild.id}.${commandName}`),
                color: 0xe74c3c
            }
        })
        x.edit(`<@!${msg.mentions.members.first().user.id}>`, {
            embed: x.embeds[0]
        })
    } else {
        if (msg.args.contains("-d")) msg.delete()
        msg.reply("", {
            embed: {
                description: client.db.get(`tags.${msg.guild.id}.${commandName}`),
                color: 0xe74c3c
            }
        })
    }
}