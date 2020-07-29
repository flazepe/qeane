module.exports = async (client, msg, cooldown) => {
  if (msg.content === '' || !msg.guild || msg.channel.type === "dm" || msg.author.bot || msg.webhookID) return;
  let prefix = client.db.get("prefix." + msg.guild.id) || client.config.prefix
  if (msg.content === `<@!${client.user.id}>`) return msg.channel.send(`my prefix is ${prefix}`)
  if (msg.content.startsWith(`<@!${client.user.id}>`)) prefix = `<@!${client.user.id}>`
  if (!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  if (cooldown.has(msg.author.id)) {
    if (Date.now() < cooldown.get(msg.author.id)) {
      return msg.reply("Woops, you need to wait 3 seconds between each command!")
    }
  }
  let premium = client.db.get(`premium.${msg.author.id}`)
  if (!premium || !premium.active) {
    cooldown.set(msg.author.id, Date.now() + 3000)
  }
  const commandName = msg.content.slice(prefix.length).trim().split(' ')[0].toLowerCase()
  if (client.db.has(`tags.${msg.guild.id}.${commandName}`)) {
    if (!msg.member.permissions.has("MANAGE_GUILD")) return;
    if (msg.mentions.members.first()) {
      return msg.channel.send(`<@!${msg.mentions.members.first().user.id}>`, {
        embed: {
          description: client.db.get(`tags.${msg.guild.id}.${commandName}`),
          color: 0xe74c3c
        }
      })
    } else {
      return msg.reply("", {
        embed: {
          description: client.db.get(`tags.${msg.guild.id}.${commandName}`),
          color: 0xe74c3c
        }
      })
    }
  }
  msg.args = msg.content.slice(prefix.length).trim().split(' ').slice(1).join(' ').trim().split(' ')
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if (!command) return;
  if (command.ownerOnly) {
    if (!client.config.ownerID.includes(msg.author.id)) return;
  }
  try {

    await command.execute(client, msg)
  } catch (err) {
    let error = {
      embed: {
        color: client.functions.randomColor(),
        description: `Woopsie doopsie, something went wrong! You can find the error right below. If you can't figure how to get around this issue, please contact my owner`,
        fields: [{ name: 'Error :', value: `\`\`\`js\n${err}\`\`\`` }]
      }
    }

    msg.reply("", error)
    console.error(err)
    client.errorWebhook.send("ERROR: " + err)
  }

}
