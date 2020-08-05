module.exports = {
    name: 'kick',
    aliases: ['k'],
    category: "moderation",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language).commands.kick
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply(str.noKickPerm + str.usage)
        if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.reply(str.botcantKick + str.usage)
        if (!msg.args.join(' ')) return msg.reply(str.noArgs + str.usage)
        let member = msg.mentions.members.first()
        let reason = msg.args.slice(1).join(' ') || str.noReason
        if (!member) return msg.reply(str.noUser + str.usage)
        if (member.id === msg.guild.id) return msg.reply(str.serverOwner + str.usage)
        if (!member.kickable) return msg.reply(str.notKickable + str.usage)
        member.user.send(str.youreKicked
            .replace("{0}}", msg.guild.name)
            .replace("{1}", msg.author.tag))
        member.kick({ reason: reason })
        msg.reply(str.memberKicked)
    }
}