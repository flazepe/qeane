module.exports = (client) => {
    setInterval(() => {
        if (client.queue.size > 0) {
            client.queue.forEach(q => {
                if (!q.songs[0].info.isStream && q.npmsg) {
                    let track = q.songs[0]
                    q.npmsg.edit({
                        embed: {
                            color: q.npmsg.embeds[0].color,
                            title: "Now playing:",
                            description: `Track: **[${track.info.title}](${track.info.uri})**\nTime: **${client.functions.duration(q.player.position)}/${client.functions.duration(track.info.length)}**\nArtist: **${track.info.author}**`,
                        }

                    })
                }
            })
        }
    }, 5000)
}