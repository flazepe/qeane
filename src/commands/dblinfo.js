  module.exports = {
    name: 'dblinfo',
    aliases: ['botinfo', 'bi'],
    category: "info",
    async execute(client,msg) {
      return msg.reply("Command not avaible for now, I need to get approved on Discord Bot List (top.gg)!");
        if (!msg.args.join(' ')) return msg.channel.send('Please mention the bot, give bot ID or bot name');
        let member = client.functions.findByID(msg.guild,msg.args.join(' ')) || msg.mentions.members.first() 
        if (!member) return msg.reply("Please mention a bot / provide a bot id/username!")
        let user = member.user
       if (!user) return msg.channel.send('Bot not found!');
        if (!user.bot) return msg.channel.send('This user is not a bot! User found: '+user.tag);
        dbl.getBot(user.id).then(async bot => {
            let e = {
              color: client.functions.randomColor(),
              description: "DBL info for "+user.tag,
              fields: [
              { name: 'Bot name :', value: bot.username, inline: true },
              { name: 'Bot discriminator (tag) :',value: bot.discriminator, inline: true },
              { name: 'Bot ID :', value: bot.id, inline: true },
              { name: 'Bot library :', value: bot.lib, inline: true },
              { name: 'Bot prefix(es) :', value: bot.prefix, inline: true },
              { name: 'Bot short desc :', value: bot.shortdesc, inline: true },
              { name: 'Bot total votes :', value: bot.points, inline: true },
              { name: 'Bot monthly votes :', value: bot.monthlyPoints, inline: true },
              { name: 'Bot approval date :', value: bot.date, inline: true }
            ]}
              
            let bottags=bot.tags.map(t => t).join(', ')
            if (!bottags) bottags = 'No tags'
            e.fields.push({ name: 'Bot tags :', value: bottags, inline: true })
            let links = `[Invite](${bot.invite})`
            if (bot.website) links += ` | [Website](${bot.website})`
            if (bot.support) links += ` | [Support Server](https://discord.gg/${bot.support})`
            if (bot.github) links += ` | [Github](${bot.github})`
            let botowners = await bot.owners.map(o => o).join(', ')
            e.fields.push({name: 'Bot owners ID :', value: botowners})
            if (bot.certifiedBot) {e.fields.push({ name: 'Is bot certified ?', value: 'Yes', inline: true })}
            else {e.fields.push({ name: 'Is bot certified ?', value: 'No', inline: true })}
            if (bot.vanity) {e.fields.push({ name: 'Bot vanity URL :', value: bot.vanity, inline: true })}
            e.fields.push({name: 'Links', value: links, inline: true})
            msg.reply("",{embed:e})
        })
    },
  };
  