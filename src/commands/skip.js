module.exports = {
    name: "skip",
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.bassboost
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        if (!msg.args[0]) {
            msg.reply("Music skipped!").then(m => { m.delete({ timeout: 15000 }) })
            serverQueue.player.stopTrack()
        } else {
            let amount = parseInt(msg.args[0])
            if (!amount || amount < 1 || amount >= serverQueue.songs.length) return msg.reply("Invalid amount of songs to skip provided!")
            serverQueue.songs.splice(0, amount - 1)
            msg.reply("Musics skipped!").then(m => { m.delete({ timeout: 15000 }) })
            serverQueue.player.stopTrack()
        }
    }
}