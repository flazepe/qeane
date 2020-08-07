module.exports = {
    name: "seek",
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.bassboost
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        if (!msg.args.join(' ')) return msg.reply(str.noArgs)
        let seek = require("timestamp-to-ms")(msg.args.join(' '))
        serverQueue.player.seekTo(seek)
        msg.reply(str.success)
    }
}