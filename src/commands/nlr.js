module.exports = {
    name: "nlr",
    aliases: ['nlradio'],
    category: "music",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language).commands.nlr
        const { MessageEmbed } = require('discord.js')
        const fetch = require('node-fetch')
        const message = msg


        fetch(`https://admin.nlradio.xyz/api/nowplaying`).then((req) => {
            req.json().then((res) => {
                //console.log(res)
                const nodj = new MessageEmbed()
                    .setTitle(str.title)

                    .setColor(client.color)
                    .setThumbnail(res[0].now_playing.song.art)

                if (!res[0].live.is_live) {
                    nodj.setDescription(str.desc
                        .replace("{0}", res[0].now_playing.song.title)
                        .replace("{1}", res[0].now_playing.song.artist)
                        .replace("{2}", "No one is Live on [nlradio.xyz](https://nlradio.xyz/)")
                        .replace("{3}", res[0].listeners.unique)
                        .replace("{4}", res[0].listeners.total))
                    return message.channel.send(nodj)
                } else {
                    nodj.setDescription(str.desc
                        .replace("{0}", res[0].now_playing.song.title)
                        .replace("{1}", res[0].now_playing.song.artist)
                        .replace("{2}", res[0].live.streamer_name)
                        .replace("{3}", res[0].listeners.unique)
                        .replace("{4}", res[0].listeners.total))
                    return message.channel.send(np)
                }

            })
        })

    }
}