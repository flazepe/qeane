const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bfm",
    category: "music",
    async execute(client, msg) {

        fetch(`http://api.beatsfm.net/beatsfm/v1/all`).then((req) => {
            req.json().then((res) => {
              let fields = [
                {name: "Song", value: `${res.now_playing.song.title}`, inline: true},
                {name: "Song Text", value: `${res.now_playing.song.text}`, inline: true},
                {name: "Artist", value: `${res.now_playing.song.artist}`, inline: true}
              ]
              client.db.set(`photo_${message.guild.id}`, res.now_playing.song.image)
              const embed = new MessageEmbed()
              .setTitle(`BeatsFM | Presenter: ${res.live.streamer_name || 'Auto DJ'}`)
              .addFields(fields)
              .setColor('#0ca895')
              .setThumbnail(res.now_playing.song.image)
              .setFooter(`${res.listeners.current} Listeners`)
              message.channel.send(embed)
            })
          })
    }
}