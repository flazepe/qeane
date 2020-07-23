module.exports = {
    name: "skip",
    category: "music",
    async execute (client,msg) {
        let player = client.music.players.get(msg.guild.id)
        if (!player) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (player.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        if (!msg.args[0]) {
            msg.reply("Music skipped!").then(m => {m.delete({timeout: 15000})})
            player.stop()
        } else {
            let amount = parseInt(msg.args[0])
            if (!amount || amount < 1 || amount>=player.queue.length) return msg.reply("Invalid amount of songs to skip provided!")
            player.queue.splice(0,amount-1)
            msg.reply("Music skipped!").then(m => {m.delete({timeout: 15000})})
            player.stop()
        }
    }
}