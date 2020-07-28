module.exports = {
    name: 'prefix',
    category: "moderation",
    async execute(client,msg) {
      if (!msg.member.permissions.toArray().includes("ADMINISTRATOR")) return msg.channel.send('Only the server admins can change my prefix!');
        if (!msg.args.join(' ')) return msg.channel.send('Please provide args! To know this server prefix, just mention me!')
       client.db.set("prefix."+msg.guild.id,msg.args.join(' '))
       msg.channel.send('Changed my prefix to **'+msg.args.join(' ')+'**')
    }
}