
module.exports = {
  name: 'avatar',
  category: "utility",
  async execute(client, msg) {
    let member;
    if (msg.args.join(' ')) {
      member = await msg.mentions.members.first() || client.functions.findByID(msg.guild, msg.args.join(' '))
    } else { member = msg.member }
    let avatar = client.functions.avatar(member)
    msg.reply("", {
      embed: {
        color: client.functions.randomColor(),
        image: {
          url: avatar
        },
        description: client.languages.get(msg.guild.language).commands.avatar.clickToDownload
        .replace("{0}",avatar)
      }
    })
  },
};
