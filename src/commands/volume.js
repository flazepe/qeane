module.exports = {
    name: "volume",
    aliases: ['vol'],
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.bassboost
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        if (!msg.args[0]) return msg.reply(`Current volume: ${serverQueue.volume}`)
        let vol = parseInt(msg.args.join(' '))
        if (!vol) return msg.reply("Woops, you don't seem to have provided a volume!")
        if (vol < 1 || vol > 250) return msg.reply("Woops, please make sure to provide a volume between 1 and 250!")
        serverQueue.player.setVolume(vol)
        serverQueue.volume = vol
        msg.reply(`Volume set to **${vol}**!`)
    }
}