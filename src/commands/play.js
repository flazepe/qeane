module.exports = {
    name: "play",
    aliases: ['p'],
    category: "music",
    async execute (client,msg) {
        let premium = client.db.get(`premium.${msg.author.id}`)
        if (!premium || !premium.active) return msg.reply("Woops, music is a premium-only feature!")
        const { channel } = msg.member.voice
        if (!channel) return msg.reply("Woops, you doesn't seem to be in a voice channel!")
        await channel.fetch()
        let args = msg.args.join(' ')
        if (!args) return msg.reply("Woops, be sure to provide a song name so I can play it!")
        const res = await client.music.search(args, msg.author);
        let player, track, time;
        switch (res.loadType) {
            case "PLAYLIST_LOADED":
                player = client.music.players.spawn({
                    guild: msg.guild,
                    voiceChannel: channel,
                    textChannel: msg.channel,
                });
                for (let elt in res.playlist.tracks) {player.queue.add(res.playlist.tracks[elt])}
                msg.reply("",{embed: {
                    color: client.functions.randomColor(),
                    title: "Playlist added",
                    description: `Title: **${res.playlist.info.name}**`,
                }}).then(msg2 => {msg2.delete({timeout: 15000})})
                break;
            case "TRACK_LOADED":
            case "SEARCH_RESULT":
                player = client.music.players.spawn({
                    guild: msg.guild,
                    voiceChannel: channel,
                    textChannel: msg.channel,
                });
                track = res.tracks[0]
                player.queue.add(track)
                time = client.functions.duration(track.duration)
                msg.reply("",{embed: {
                    color: client.functions.randomColor(),
                    title: "Track added",
                    description: `Track: **${track.title}**\nDuration: **${track.isStream?"Live stream":time}**\nArtist: **${track.author}**`,
                }}).then(msg2 => {msg2.delete({timeout: 15000})})
                break;
            default:
                return msg.reply("Woops, something went wrong, and I can't find what you're searching!")

        }        
        if (!player.playing) player.play();
    }
}
