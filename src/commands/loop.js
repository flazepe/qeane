module.exports = {
    name: "loop",
    category: "music",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language)
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(str.music.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(str.music.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(str.music.notSameVc)
        let type = msg.args[0]
        let types = [str.commands.loop.types.queue, str.commands.loop.types.track, str.commands.loop.types.disable]
        if (!types.includes(type.toLowerCase())) return msg.reply(str.commands.loop.usage)
        switch (msg.args[0]) {
            case str.commands.loop.types.queue:
                serverQueue.loopType = 2
                msg.reply("The queue will now loop!")
                return;
            case str.commands.loop.types.track:
                serverQueue.loopType = 1
                msg.reply("The current track will now repeat!")
                return;
            case str.commands.loop.types.disable:
                serverQueue.loopType = 0
                msg.reply("Loop disabled!")
                return;
        }
    }
}
