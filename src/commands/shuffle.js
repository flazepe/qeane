module.exports = {
    name: "shuffle",
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.shuffle
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        serverQueue.songs = [serverQueue.songs[0], ...shuffle(serverQueue.songs)]
        msg.reply(str.success)
    }
}