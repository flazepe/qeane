module.exports = {
  name: 'eval',
  ownerOnly: true,
  category: "owner",
  async execute(client, msg) {
    let str = client.languages.get(msg.guild.language).commands.eval
    try {
      const code = msg.args.join(" ");
      let evaled = require('util').inspect(await eval(code));
      if (evaled.length > 2000) {
        console.log(evaled)
        return msg.reply(str.tooLongText)
      } else {
        msg.reply(evaled, { code: "js" })
      };
    } catch (err) {
      console.log(err)
      msg.reply(err)
    };

  },
};
