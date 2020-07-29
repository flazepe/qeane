module.exports = {
    name: "play",
    aliases: ['p'],
    category: "music",
    async execute(client, msg) {
        const { channel } = msg.member.voice
        if (!channel) return msg.reply("Woops, you doesn't seem to be in a voice channel!")
        await channel.fetch()
        if (!msg.args[0]) return msg.reply("Woops, you have to give me a song name/url!")
        const node = client.shoukaku.getNode();
        let data = await node.rest.resolve(msg.args.join(' ')) || await node.rest.resolve(msg.args.join(' '), 'youtube');
        if (!data) return msg.reply("Woops, no tracks were found! Please try with the youtube URL!");
        if (client.shoukaku.getPlayer(msg.guild.id)) {
            let serverQueue = client.queue.get(msg.guild.id)
            switch (data.type) {
                case "PLAYLIST":
                    serverQueue.songs.push(...data.tracks)
                    msg.reply("", {

                        embed: {
                            color: client.functions.randomColor(),
                            title: "Playlist added",
                            description: `Title: **${data.playlistName}**`,
                        }

                    }).then(msg2 => { msg2.delete({ timeout: 15000 }) })
                    break;
                case "SEARCH":
                case "TRACK":
                    serverQueue.songs.push(data.tracks[0])
                    let track = data.tracks[0]

                    time = client.functions.duration(track.info.length)
                    msg.reply("", {

                        embed: {
                            color: client.functions.randomColor(),
                            title: "Track added",
                            description: `Track: **[${track.info.title}](${track.info.uri})**\nDuration: **${track.info.isStream ? "Live stream" : time}**\nArtist: **${track.info.author}**`,
                        }

                    }).then(msg2 => { msg2.delete({ timeout: 15000 }) })
                    break;
            }
            return;
        } else {
            const player = await node.joinVoiceChannel({
                guildID: msg.guild.id,
                voiceChannelID: msg.member.voice.channelID
            });
            let serverQueue = {
                songs: ["song"],
                loopType: 0, //0 none, 1 track, 2 queue
                volume: 100,
                textChannel: msg.channel,
                voiceChannel: channel,
                npmsg: null,
                player: player,
                bassboost: 0,
                npmsginterval: null
            }
            switch (data.type) {
                case "PLAYLIST":
                    serverQueue.songs.push(...data.tracks)
                    msg.reply("", {

                        embed: {
                            color: client.functions.randomColor(),
                            title: "Playlist added",
                            description: `Title: **${data.playlistName}**`,
                        }

                    }).then(msg2 => { msg2.delete({ timeout: 15000 }) })
                    break;
                case "SEARCH":
                case "TRACK":
                    serverQueue.songs.push(data.tracks[0])
                    let track = data.tracks[0]
                    time = client.functions.duration(track.info.length)
                    msg.reply("", {

                        embed: {
                            color: client.functions.randomColor(),
                            title: "Track added",
                            description: `Track: **[${track.info.title}](${track.info.uri})**\nDuration: **${track.info.isStream ? "Live stream" : time}**\nArtist: **${track.info.author}**`,
                        }

                    }).then(msg2 => { msg2.delete({ timeout: 15000 }) })
                    break;
            }
            client.queue.set(msg.guild.id, serverQueue)
            player.on('end', () => {
                play(serverQueue, client, player)
            });
            player.on('closed', () => {
                serverQueue.textChannel.send("Woops, it seems that you've disconnected me from a voice channel! Destroying the queue...")
                player.disconnect()
                client.queue.delete(msg.guild.id)
            });
            player.on('error', (e) => {
                serverQueue.textChannel.send("Woops, something unexcepted happens! " + e)
                player.disconnect()
                client.queue.delete(msg.guild.id)
            });
            player.on('nodeDisconnect', () => {
                serverQueue.textChannel.send("Woops, I cn not play music because my node was disconnected. Please contact my owner about this!")
                player.disconnect()
                client.queue.delete(msg.guild.id)
            });
            play(serverQueue, client, player)
        }
    }
}
async function play(serverQueue, client, player) {
    switch (serverQueue.loopType) {
        case 0:
            serverQueue.songs.shift()
            break;
        case 1:
            //just repeating the same track over and over again, no need to touch the queue
            break;
        case 2:
            serverQueue.songs = [...serverQueue.songs, serverQueue.songs[0]]
            break;
    }
    if (serverQueue.npmsg) { serverQueue.npmsg.delete() }
    if (!serverQueue.songs[0]) {
        serverQueue.textChannel.send("Queue has ended, leaving the voice channel...")
        player.disconnect()
        client.queue.delete(serverQueue.textChannel.guild.id)
        return;
    }
    let track = serverQueue.songs[0]
    await player.playTrack(track)
    await player.setEqualizer(client.functions.getEq(serverQueue.bassboost))

    let time = client.functions.duration(track.info.length)

    let m = await serverQueue.textChannel.send({
        embed: {
            color: client.functions.randomColor(),
            title: "Now playing:",
            description: `Track: **[${track.info.title}](${track.info.uri})**\nTime: **${track.info.isStream ? "Live stream" : `${client.functions.duration(serverQueue.player.position)}/${time}`}**\nArtist: **${track.info.author}**`,
        }

    })
    if (!track.info.isStream) {
        serverQueue.npmsginterval = setInterval(() => {
            m.edit({
                embed: {
                    color: client.functions.randomColor(),
                    title: "Now playing:",
                    description: `Track: **[${track.info.title}](${track.info.uri})**\nTime: **${client.functions.duration(serverQueue.player.position)}/${time}**\nArtist: **${track.info.author}**`,
                }

            })
        })
    }
    serverQueue.npmsg = m
}