module.exports = {
    name: "queue",
    aliases: ['q','nowplaying','np'],
    category: "music",
    async execute (client,msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply('Woops, nothing is playing here!');
        const output = []
        for (let i = 1; i < Math.min(serverQueue.songs.length, 11); i++) {
          output[i] = [
            `${i}- [${serverQueue.songs[i].info.title}](${serverQueue.songs[i].info.uri})\n`
          ].join('\n');
        }
        if (!output[1]) output[1]='Nothing'
        
        const Discord = require('discord.js')
        let queueemb = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Server queue')
        .setDescription(`**__Now playing :__** \n[${serverQueue.songs[0].info.title}](${serverQueue.songs[0].info.uri})\n\n**__Incoming :__** \n${output.join(' ')}`)
        if (serverQueue.songs.length > 11) 
        {queueemb.setFooter(`${serverQueue.songs.length-11} more songs...`)
      } 
        msg.reply("",queueemb)
    }
  }