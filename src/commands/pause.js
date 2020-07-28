module.exports = {
    name: "pause",
    category: "music",
    async execute (client,msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        if(!serverQueue.player.pause) return msg.reply("Woops, the current song is already paused!")
        serverQueue.player.setPaused(true)
        msg.reply("Paused the song! Use the **resume** command to resume it!")
    }
}