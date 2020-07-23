module.exports = {
  name: "queue",
  aliases: ['q','nowplaying','np'],
  category: "music",
  async execute (client,msg) {
      let player = client.music.players.get(msg.guild.id)
      if (!player) return message.channel.send('Woops, nothing is playing here!');
      const output = []
      for (let i = 1; i < Math.min(player.queue.length, 11); i++) {
        output[i] = [
          `${i}- [${player.queue[i].title}](${player.queue[i].uri})\n`
        ].join('\n');
      }
      if (!output[1]) output[1]='Nothing'
      
      const Discord = require('discord.js')

      const nlr = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Server queue')
      .setDescription(`**__Now playing :__** \n[${player.queue[0].title}](https://nlradio.xyz/)\n\n**__Incoming :__** \n${output.join(' ')}`)
      if (player.queue.length > 11) return nlr.setFooter(`${player.queue.length-11} more songs...`)

      const nlrfr = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Server queue')
      .setDescription(`**__Now playing :__** \n[${player.queue[0].title}](https://nlradio.xyz/fr/)\n\n**__Incoming :__** \n${output.join(' ')}`)
      if (player.queue.length > 11) return nlr.setFooter(`${player.queue.length-11} more songs...`)

      if (player.queue[0].uri === 'https://admin.nlradio.xyz/radio/8010/nlr.mp3') return msg.channel.send("",nlr)
      if (player.queue[0].uri === 'https://admin.nlradio.xyz/radio/8000/french/nlr.mp3') return msg.channel.send("",nlrfr)
      let queueemb = new Discord.MessageEmbed()

      .setColor('RANDOM')
      .setAuthor('Server queue')
      .setDescription(`**__Now playing :__** \n[${player.queue[0].title}](${player.queue[0].uri})\n\n**__Incoming :__** \n${output.join(' ')}`)
      if (player.queue.length > 11) 
      {queueemb.setFooter(`${player.queue.length-11} more songs...`)
    } 
      msg.reply("",queueemb)
  }
}