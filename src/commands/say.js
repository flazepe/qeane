module.exports = {
  name: 'say',
  category: "utility",
  async execute(_client, msg) {
    if (!msg.args.join(' ')) return msg.reply("Usage: ``say <something>``")
    msg.delete().then(
      msg.reply(msg.args.join(' ')))
  },
} 