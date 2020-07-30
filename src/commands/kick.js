module.exports = {
    name: 'kick',
    aliases: ['k'],
    category: "moderation",
    async execute(client, msg) {
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("Woops, you can't kick members!")
        if (!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.reply("Woops, I can't kick members!")
        if (!msg.args.join(' ')) return msg.reply("Please provide a user to ban! (mention or user id)")
        let member = msg.mentions.members.first() || client.functions.findByID(msg.guild, msg.args.join(' '))
        let reason = msg.args.slice(1).join(' ') || 'No reason provided'
        if (!member) return msg.channel.send('Woops,  user not found!')
        if (member.user.id === client.ownerID) return msg.reply("I can't kick my dev!")
        if (member.id === msg.guild.id) return msg.reply("Woops, the server owner can not be kicked!")
        if (!member.kickable) return msg.reply("Woops, I can't kick this member! Please make sure my role is above this member's highest role!")
        member.user.send(`You have been kicked from **${msg.guild.name}** by **${msg.author.tag}**`)
        member.kick({ reason: reason })
        msg.reply("Member succesfully kicked!")
    }
}