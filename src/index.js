module.exports = function (client) {
  const cooldown = new Map(), Discord = require('discord.js-light')
  const msgDelete = require('./events/msgDelete.js')
  const msgEvent = require('./events/msg.js')
  const guildWebhook = new Discord.WebhookClient("735514604603441243", "ZUYCPoCUoB453RgagMsY3qjgxXByuyUcZdOEIVktwdPgct_cL0GS1ZrIhlHr9d5G_-en")
  //https://ptb.discordapp.com/api/webhooks/735514604603441243/ZUYCPoCUoB453RgagMsY3qjgxXByuyUcZdOEIVktwdPgct_cL0GS1ZrIhlHr9d5G_-en
  const errorWebhook = new Discord.WebhookClient("735549440445644915", "uxgxWqcryNLb_MLYpDuqWEk6nfZWd8JGAYBac2297p2nSOsLF3S5ThvWGLImv-l8nppT")
  //https://ptb.discordapp.com/api/webhooks/735549440445644915/uxgxWqcryNLb_MLYpDuqWEk6nfZWd8JGAYBac2297p2nSOsLF3S5ThvWGLImv-l8nppT
  client.errorWebhook = errorWebhook

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
      require('./setup/dbl')(client)
      console.log("Qeane is ready!")
      require('./setup/webhooks')(client)
    } catch (e) {
      console.log(e)
      client.errorWebhook.send("ERROR: " + e)
    }
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