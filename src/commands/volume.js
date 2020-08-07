module.exports = {
    name: "volume",
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.volume
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        if (!msg.args[0]) return msg.reply(str.current
            .replace("{0}", serverQueue.volume))
        let vol = parseInt(msg.args.join(' '))
        if (!vol) return msg.reply(str.noArgs)
        if (vol < 1 || vol > 250) return msg.reply(str.invalid)
        serverQueue.player.setVolume(vol)
        serverQueue.volume = vol
        msg.reply(str.success
            .replace("{0}", vol))
    }
}