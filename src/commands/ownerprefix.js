module.exports = {
    name: "ownerprefix",
    ownerOnly: true,
    category: "owner",
    async execute(_client,msg) {

        if (!msg.args.join(' ')) return msg.channel.send('Please provide args! To know this server prefix, just mention me!')
        client.db.set("prefix."+msg.guild.id,msg.args.join(' '))
        msg.channel.send('Changed my prefix to **'+msg.args.join(' ')+'**')

    }
}