module.exports = {
  name: "serverinfo",
  aliases: ['si'],
  category: "info",
  async execute(client, msg) {
    let args = msg.args
    let guild = msg.guild
    let owner = await guild.members.fetch({ id: guild.ownerID })
    let channels = { text: 0, voice: 0, categories: 0, unknow: 0 }
    guild.channels.cache.forEach(c => {
      if (c.type === "text") { channels.text++ }
      else if (c.type === "voice") { channels.voice++ }
      else if (c.type === "category") { channels.categories++ }
      else { channels.unknow++ }
    })
    let rolelist = guild.roles.cache.map(r => r).join(', ')
    let channellist = guild.channels.cache.filter(c => c.type === "text").map(c => c).join(', ')
    let emojilist = guild.emojis.cache.map(e => e).join(', ')
    let fields = [
      { name: "Server name", value: guild.name, inline: true },
      { name: "Server ID", value: guild.id, inline: true },
      { name: "Server region", value: guild.region, inline: true },
      { name: "Member count", value: guild.memberCount, inline: true },
      { name: "Large server", value: guild.large ? "Yes" : "No", inline: true },
      { name: "Owner", value: owner.nickname ? `${owner.nickname} (${owner.user.tag})` : owner.user.tag, inline: true },
      { name: "Created at", value: guild.createdAt, inline: true },
      { name: "Role count", value: guild.roles.cache.size, inline: true },
      { name: "Role list", value: rolelist.length > 1024 ? `Too much roles to display. Try doing \`\`serverinfo role list\`\`` : rolelist, inline: rolelist.length > 1024 ? true : false }

    ]

    if (args.join(' ')) {
      args = args.join(' ').toLowerCase()
      for (let i = 0; i < fields.length; i++) {
        let f = fields[i]
        if (args === f.name.toLowerCase()) {
          if (args === "role list") {
            return msg.reply("", { embed: { title: f.name, description: rolelist.length > 2000 ? "Sorry, but I can't display role list for your server." : rolelist } })
          } else {
            return msg.reply("", { embed: { title: f.name, description: f.value } })
          }
        }
      }
    }
    msg.reply("", {
      embed: {
        title: "Server info",
        thumbnail: { url: guild.iconURL({ dynamic: true }) },
        fields: fields
      }
    })
  }
}
