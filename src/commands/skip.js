module.exports = {
    name: "skip",
    category: "music",
    async execute (client,msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        if (!msg.args[0]) {
            msg.reply("Music skipped!").then(m => {m.delete({timeout: 15000})})
            serverQueue.player.stopTrack()
        } else {
            let amount = parseInt(msg.args[0])
            if (!amount || amount < 1 || amount>=player.queue.length) return msg.reply("Invalid amount of songs to skip provided!")
            serverQueue.songs.splice(0,amount-1)
            msg.reply("Musics skipped!").then(m => {m.delete({timeout: 15000})})
            serverQueue.player.stopTrack()
        }
    }
}