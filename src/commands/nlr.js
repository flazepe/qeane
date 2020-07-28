module.exports = {
    name: "nlr",
    aliases: ['nlradio'],
    category: "music",
    async execute (client,msg) {
        const { MessageEmbed } = require('discord.js')
        const fetch = require('node-fetch')
        const message = msg
        const say = msg.args.join(' ')


            fetch(`https://admin.nlradio.xyz/api/nowplaying`).then((req) => {
            req.json().then((res) => {
                //console.log(res)
              const nodj = new MessageEmbed()
              .setTitle('Now Playing: Next Level Radio')
              .setDescription(`Song: ${res[0].now_playing.song.title} \nAuthor: ${res[0].now_playing.song.artisit} \nPresenter: No one is Live on [nlradio.xyz](https://nlradio.xyz/) \n\n > Unique Listeners: ${res[0].listeners.unique} \n > Total Listeners: ${res[0].listeners.total}`)
              .setColor(client.color)
              .setThumbnail(res[0].now_playing.song.art)

              if(res[0].live.is_live === false) return message.channel.send(nodj)
                const np = new MessageEmbed()
                .setTitle('Now Playing: Next Level Radio')
                .setDescription(`Song: ${res[0].now_playing.song.title} \nAuthor: ${res[0].now_playing.song.artist} \nPresenter: ${res[0].live.streamer_name} \n\n > Unique Listeners: ${res[0].listeners.unique} \n > Total Listeners: ${res[0].listeners.total}`)
                .setColor(client.color)
                .setThumbnail(res[0].now_playing.song.art)
                return message.channel.send(np)
            })
        })

    }
}