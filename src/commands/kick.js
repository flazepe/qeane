module.exports = {
    name: 'kick',
    aliases: ['k'],
    category: "moderation",
    async execute(client,msg,args) {
        if(!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("Woops, you can't kick members!")
        if(!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.reply("Woops, I can't kick members!")
        if (!msg.args.join(' ')) return msg.reply("Please provide a user to ban! (mention or user id)")
        let member = msg.mentions.members.first() || client.functions.findByID(msg.guild,msg.args.join(' '))
        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No reason provided'
    if (!member) return msg.channel.send('Woops,  user not found!')
    if (member.user.id === client.ownerID) return msg.reply("I can't kick my dev!")
    member.user.send(`You have been kicked from **${msg.guild.name}** by **${msg.author.tag}**`)
    member.kick({reason: reason})
    msg.reply("Member succesfully kicked!")
    }
}