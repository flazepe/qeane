module.exports = {
    name: "nowplaying",
    aliases: ['np'],
    category: "music",
    async execute(client, msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply("Woops, nothing is playing here!")
        msg.reply(serverQueue.linkToNpmsg)
    }
}
