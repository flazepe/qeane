module.exports = {
  name: 'language',
  category: "moderation",
  async execute(client, msg) {
    let str = client.languages.get(msg.guild.language)
    if (!msg.member.permissions.toArray().includes("ADMINISTRATOR")) return msg.reply(str.commands.language.lackOfPermissions);
    if (!msg.args.join(' ')) return msg.reply(str.usage)
    if (msg.args[0] === "list") {
      let langstr = [];
      client.languages.forEach(l => {
        langstr.push(`**${l.name}**`)
      })
      langstr = langstr.join(', ')
      msg.reply(langstr)
      return;
    }
    let language = client.languages.get(msg.args.join(' '))
    if (!language) return msg.reply(`${str.commands.language.invalidLanguage}\n${str.usage}`)
    client.db.set("language." + msg.guild.id, msg.args.join(' '))
    msg.guild.language = language
    msg.reply(str.commands.language.success.replace("{0}", msg.args.join(' ')))
  }
}