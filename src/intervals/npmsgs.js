module.exports = (client) => {
    setInterval(() => {
        if (client.queue.size > 0) {
            client.queue.forEach(q => {
                if (!q.songs[0].info.isStream && q.npmsg) {
                    let track = q.songs[0]
                    let musicStr = client.languages.get(q.textChannel.guild.language).music
                    q.npmsg.edit({
                        embed: {
                            color: q.npmsg.embeds[0].color,
                            title: musicStr.np.title,
                            description: musicStr.np.desc
                                .replace("{0}", track.info.title)
                                .replace("{1}", track.info.uri)
                                .replace("{2}", `${client.toolkit.createProgressBar(serverQueue.player.position, track.info.length, { elapsedChar: "-", progressChar: "+", emptyChar: "." })}\n${client.functions.duration(q.player.position)}/${time}`)
                                .replace("{3}", track.info.author)
                        }
                    })
                }
            })
        }
    }, 5000)
}