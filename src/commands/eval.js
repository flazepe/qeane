module.exports = {
  name: 'eval',
  ownerOnly: true,
  category: "owner",
  async execute(client, msg) {
    let str = client.languages.get(msg.guild.language).commands.eval
    try {
      const code = msg.args.join(" ");
      let evaled = require('util').inspect(eval(code));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      evaled.replace(client.token, str.tokenLeak)
      if (evaled.length > 1024) {
        console.log(evaled)
        return msg.reply(str.tooLongText)
      } else {
        msg.reply("", {
          embed: {
            color: client.functions.randomColor(),
            descripion: str.success,
            fields: [
              { name: str.input, value: `\`\`\`js\n${msg.args.join(' ')}\`\`\`` },
              { name: str.output, value: `\`\`\`js\n${evaled}\`\`\`` }
            ]
          }
        })
      };
    } catch (err) {
      console.log(err)
      msg.reply("", {
        embed: {
          color: client.functions.randomColor(),
          descripion: str.failure,
          fields: [
            { name: str.input, value: `\`\`\`js\n${msg.args.join(' ')}\`\`\`` },
            { name: str.output, value: `\`\`\`js\n${err}\`\`\`` }
          ]
        }
      })
    };

  },
};
