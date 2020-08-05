module.exports = function (client) {
  const Discord = require('discord.js-light')
  client.events = require('auto-load')('./src/events')
  client.setup = require('auto-load')('./src/setup')
  client.intervals = require('auto-load')('./src/intervals')
  client.config = require('../config.json')
  const guildWebhook = new Discord.WebhookClient(client.config.webhooks.guild.id, client.config.webhooks.guild.token)
  const errorWebhook = new Discord.WebhookClient(client.config.webhooks.errors.id, client.config.webhooks.errors.token)
  const logs = new Discord.WebhookClient(client.config.webhooks.logs.id, client.config.webhooks.logs.token)
  client.errorWebhook = errorWebhook
  client.logs = logs
  client.intervals.npmsgs(client)

  client.on('guildCreate', async guild => {
    if (guild.id === '538361750651797504') return guild.leave()
    guildWebhook.send(`==JOINED SERVER==\n\nName: **${guild.name}**\nID: **${guild.id}**\nNew server count: **${client.guilds.cache.size}**`)
  })

  client.on("guildDelete", async guild => {
    guildWebhook.send(`==LEFT SERVER==\n\nName: **${guild.name}**\nID: **${guild.id}**\nNew server count: **${client.guilds.cache.size}**`)
  })

  client.on('ready', async () => {
    client.user.setActivity(`qeane help`)
    setInterval(function () {
      client.user.setActivity(`qeane help`)
    }, 1800000);

    console.log("=====___==========================")
    console.log("=== / _ \\  ___  __ _ _ __   ___ ===")
    console.log("===| | | |/ _ \\/ _` | '_ \\ / _ \\===")
    console.log("===| |_| |  __/ (_| | | | |  __/===")
    console.log("=== \\__\\_\\\\___|\\__,_|_| |_|\\___|===")
    console.log("===================================")
    try {
      client.setup.client(client)
      client.setup.sliceEvery()
      if (client.user.id === "727163097026003004") {
        client.setup.dbl(client)
        client.setup.webhooks(client)
      }
      console.log("Qeane is ready!")
    } catch (e) {
      console.log(e)
      client.errorWebhook.send("ERROR: " + e)
    }
    client.logs.send(`Qeane has started at${new Date(Date.now())}`)
  })

  client.on("reconnecting", () => {
    console.log("Reconnecting!");
  });

  client.on("disconnect", () => {
    console.log("Disconnect!");
  });


  client.on('message', async msg => {
    client.events.msg(client, msg)
  });


  client.on("guildMemberAdd", async member => {
    await member.fetch()
    await member.user.fetch()
    let log = client.db.get(`logs.${member.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0x5742dc,
        author: {
          name: `${member.user.tag} (${member.user.id})`,
          icon_url: client.functions.avatar(member.user)
        },
        title: "Member joined",
        timestamp: Date.now()
      }
    })
  })

  client.on("guildMemberRemove", async member => {
    await member.fetch()
    await member.user.fetch()
    let log = client.db.get(`logs.${member.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0x5742dc,
        author: {
          name: `${member.user.tag} (${member.user.id})`,
          icon_url: client.functions.avatar(member.user)
        },
        title: "Member left/got kicked",
        timestamp: Date.now()
      }
    })
  })

  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    let log = client.db.get(`logs.${newMember.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    let str = "";
    if (oldMember.nickname !== newMember.nickname) str += `**Old nickname:** ${oldMember.nickname || "No nickname"} | **New nickname:** ${newMember.nickname || "No nickname"}\n`
    if (oldMember.permissions.bitfield !== newMember.permissions.bitfield) str += `**Old permissions:** ${client.functions.membersPermissions(oldMember)} | **New permissions:** ${client.functions.memberPermissions(newMember)}\n`
    if (!str) return;
    log.send("", {
      embed: {
        color: 0xc25a4f,
        title: `Member updated updated. ID: ${oldMember.id}`,
        description: str,
        timestamp: Date.now()
      }
    })
  })

  client.on("messageDelete", async msg => {
    msg = client.msgs.get(msg.id)
    client.events.msgDelete(client, msg)
    let log = client.db.get(`logs.${msg.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xff415d,
        author: {
          name: `${msg.author.tag} (${msg.author.id})`,
          icon_url: client.functions.avatar(msg.author)
        },
        title: `Message deleted in #${msg.channel.name}. Content:`,
        description: msg.content,
        timestamp: Date.now()
      }
    })
  })

  client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (oldMsg.content === newMsg.content) return;
    let log = client.db.get(`logs.${newMsg.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xad25f7,
        author: {
          name: `${newMsg.author.tag} (${newMsg.author.id})`,
          icon_url: client.functions.avatar(newMsg.author)
        },
        title: `Message edited in ${oldMsg.channel.name}`,
        description: `**Old content:** ${oldMsg.content.length > 1000 ? "Content too long" : oldMsg.content} | **New content:** ${newMsg.content.length > 1000 ? "Content too long" : newMsg.content}`,
        timestamp: Date.now()
      }
    })
  })

  client.on("roleCreate", async role => {
    let log = client.db.get(`logs.${role.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xdcf24e,
        title: "New role created",
        description: `**Name:** ${role.name} | **ID:** ${role.id}`,
        timestamp: Date.now()
      }
    })
  })

  client.on("roleDelete", async role => {
    let log = client.db.get(`logs.${role.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xf241de,
        title: "Role deleted",
        description: `**Name:** ${role.name} | **ID:** ${role.id}`,
        timestamp: Date.now()
      }
    })
  })

  client.on("roleUpdate", async (oldRole, newRole) => {
    let log = client.db.get(`logs.${newRole.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    let str = "";
    if (oldRole.name !== newRole.name) str += `**Old name:** ${oldRole.name} | **New name:**: ${newRole.name}\n`
    if (oldRole.hexColor !== newRole.hexColor) str += `**Old color:** ${oldRole.hexColor} | **New color:** ${newRole.hexColor}\n`
    if (oldRole.hoist !== newRole.hoist) str += `**Was hoisted?** ${oldRole.hoist ? "Yes" : "No"} | **Is hoisted?** ${newRole.hoist ? "Yes" : "No"}\n`
    if (oldRole.mentionable !== newRole.mentionable) str += `**Was mentionable?** ${oldRole.mentionable ? "Yes" : "No"} | **Is mentionable?** ${newRole.mentionable ? "Yes" : "No"}\n`
    if (oldRole.position !== newRole.position) str += `**Old position:** ${oldRole.position} | **New position:** ${newRole.position}\n`
    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) str += `**Old permissions:**: ${client.functions.rolesPermissions(oldRole)} | **New permissions:** ${client.functions.rolesPermissions(newRole)}`
    if (!str) return;
    log.send("", {
      embed: {
        color: 0x483dbf,
        title: `Role updated. ID: ${oldRole.id}`,
        description: str,
        timestamp: Date.now()
      }
    })
  })

  client.on('channelCreate', async channel => {
    let log = client.db.get(`logs.${channel.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0x461bf5,
        title: "Channel created",
        description: `**Channel:** ${channel} | **Channel ID:** ${channel.id}`
      }
    })
  })

  client.on('channelDelete', async channel => {
    let log = client.db.get(`logs.${channel.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0x461bf5,
        title: "Channel deleted",
        description: `**Channel:** ${channel.name} | **Channel ID:** ${channel.id}`
      }
    })
  })

  client.on('channelUpdate', async (oldChannel, newChannel) => {
    let log = client.db.get(`logs.${newChannel.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    let str = "";
    if (oldChannel.name !== newChannel.name) str += `**Old name:** ${oldChannel.name} | New name:** ${newChannel.name}\n`
    if (oldChannel.type !== newChannel.type) str += `**Old type:** ${oldChannel.type} | **New type:** ${newChannel.type}\n`
    if (oldChannel.parent !== newChannel.parent) str += `**Old category:** ${oldChannel.parent ? oldChannel.parent.name : "No category"} | **New category:** ${newChannel.parent ? newChannel.parent.name : "No category"}\n`
    if (oldChannel.position !== newChannel.position) str += `**Old position:** ${oldChannel.position} | **New position:** ${newChannel.position}\n`
    if (oldChannel.nsfw !== newChannel.nsfw) str += `**Was NSFW?** ${oldChannel.nsfw ? "Yes" : "No"} | **Is NSFW?** ${newChannel.nsfw ? "Yes" : "No"}\n`
    if (oldChannel.topic !== newChannel.topic) str += `**Old topic:** ${oldChannel.topic} | **New topic:** ${newChannel.topic}\n`
    if (!str) return;
    log.send("", {
      embed: {
        color: 0xdf2b2a,
        title: `Channel updated. ID: ${oldChannel.id}`,
        description: str,
        timestamp: Date.now()
      }
    })
  })

  client.on('inviteCreate', async invite => {
    let log = client.db.get(`logs.${invite.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xd2f5e2,
        title: "Invite created",
        description: `**Invite code:** ${invite.code} | **Creator:** ${invite.inviter.tag} | **Expires at:** ${invite.expiresTimestamp ? new Date(invite.expiresTimestamp) : "Never"} | **Uses:** ${invite.uses ? invite.uses : "Unlimited"}`
      }
    })
  })

  client.on('inviteDelete', async invite => {
    let log = client.db.get(`logs.${invite.guild.id}`)
    if (log) log = client.channels.cache.get(log.id) || await client.channels.fetch(log.id)
    if (!log) return;
    log.send("", {
      embed: {
        color: 0xd2f5e2,
        title: "Invite deleted",
        description: `**Invite code:** ${invite.code}`
      }
    })
  })
}