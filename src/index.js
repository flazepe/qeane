module.exports = function (client) {
  const cooldown = new Map(), Discord = require('discord.js-light')
  const msgDelete = require('./events/msgDelete.js')
  const msgEvent = require('./events/msg.js')
  client.config = require('../config.json')
  const guildWebhook = new Discord.WebhookClient(client.config.webhooks.guild.id, client.config.webhooks.guild.token)
  const errorWebhook = new Discord.WebhookClient(client.config.webhooks.errors.id, client.config.webhooks.errors.token)
  const logs = new Discord.WebhookClient(client.config.webhooks.logs.id, client.config.webhooks.logs.token)
  client.errorWebhook = errorWebhook
  client.logs = logs

  require('./intervals/npmsgs')(client)

  client.on('guildCreate', async guild => {
    if (guild.id === '538361750651797504') return guild.leave()
    guildWebhook.send(`==JOINED SERVER==\n\nName: **${guild.name}**\nID: **${guild.id}**\nNew server count: **${client.guilds.cache.size}**`)
  })

  client.on("guildDelete", async guild => {
    guildWebhook.send(`==LEFT SERVER==\n\nName: **${guild.name}**\nID: **${guild.id}**\nNew server count: **${client.guilds.cache.size}**`)
  })

  client.on('messageDelete', (msg) => {
    msgDelete(client, msg)
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
      require('./setup/client')(client)
      require('./setup/sliceEvery')()
      if (client.user.id === "727163097026003004") {
        require('./setup/dbl')(client)
      }
      console.log("Qeane is ready!")
      require('./setup/webhooks')(client)
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
    msgEvent(client, msg, cooldown)
  });

}