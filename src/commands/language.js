module.exports = {
    name: 'language',
    category: "moderation",
    async execute(client, msg) {
      if (!msg.member.permissions.toArray().includes("ADMINISTRATOR")) return msg.reply(client.languages.get(msg.guild.language).commands.language.lackOfPermissions);
      if (!msg.args.join(' ')) return msg.reply(client.languages.get(msg.guild.language).commands.language.noArgs)
      let language = client.languages.get(msg.args.join(' '))
      if (!language) return msg.reply(client.languages.get(msg.guild.language).commands.language.invalidLanguage)
      client.db.set("language." + msg.guild.id, msg.args.join(' '))
      msg.reply(client.languages.get(msg.guild.language).commands.language.success.replace("{0}",msg.args.join(' ')))
    }
  }