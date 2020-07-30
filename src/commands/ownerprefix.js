module.exports = {
    name: "ownerprefix",
    ownerOnly: true,
    category: "owner",
    async execute(client, msg) {

        if (!msg.args.join(' ')) return msg.reply('Please provide args! To know this server prefix, just mention me!')
        client.db.set("prefix." + msg.guild.id, msg.args.join(' '))
        msg.reply('Changed my prefix to **' + msg.args.join(' ') + '**')

    }
}