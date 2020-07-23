module.exports = {
    name: 'nickname',
    category: "moderation",
    async execute(_client,msg) {
        if(!msg.member.permissions.has("MANAGE_NICKNAMES")) return msg.reply("Woops, you can't manage nicknames!")
        if(!msg.guild.me.permissions.has("MANAGE_NICKNAMES")) return msg.reply("Woops, I can't manage nicknames!")
        let member = msg.mentions.members.first() || msg.guild.members.cache.get(msg.args.join(' '))
        if (!member) return msg.channel.send('Please provide a user id or @mention someone!')
        let nickname = msg.args.slice(1).join(' ')
        if (!nickname) return msg.channel.send('Please provide a nickname!')
        member.setNickname(nickname)
        msg.channel.send('Done!')
    }
}
