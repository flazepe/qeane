module.exports = {
  name: 'prefix',
  category: "moderation",
  async execute(client, msg) {
    if (!msg.member.permissions.toArray().includes("ADMINISTRATOR")) return msg.reply('Only the server admins can change my prefix!');
    if (!msg.args.join(' ')) return msg.reply('Please provide args! To know this server prefix, just mention me!')
    client.db.set("prefix." + msg.guild.id, msg.args.join(' '))
    msg.reply('Changed my prefix to **' + msg.args.join(' ') + '**')
  }
}