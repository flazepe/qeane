module.exports = {
    name: "nowplaying",
    aliases: ['np'],
    category: "music",
    async execute(client, msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(client.languages.get(msg.guild.language).music.queueEmpty)
        msg.reply(serverQueue.linkToNpmsg)
    }
}
