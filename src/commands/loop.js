module.exports = {
    name: "loop",
    category: "music",
    async execute (client,msg) {
        let player = client.music.players.get(msg.guild.id)
        if (!player) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (player.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        let type = msg.args[0]
        let types = ["queue", "track", "disable"]
        if (!types.includes(type)) return msg.reply("Usage: ``loop <queue/track/disable>``")
        switch (msg.args[0]) {
            case "queue":
                player.setQueueRepeat(true)
                msg.reply("The queue will now loop!")
                return;
            case "track":
                player.setTrackRepeat(true)
                msg.reply("The current track will now repeat!")
                return;
            case "disable":
                player.setQueueRepeat(false)
                player.setTrackRepeat(false)
                msg.reply("Loop disabled!")
                return;
        }
    }
}
