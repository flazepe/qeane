module.exports = {
    name: "seek",
    category: "music",
    async execute (client,msg) {
        let player = client.music.players.get(msg.guild.id)
        if (!player) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (player.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        if (!msg.args.join(' ')) return msg.reply("Usage: ``seek <position (ex: 4m 2s)>``")
        let seek=require("timestamp-to-ms")(msg.args.join(' '))
        player.seek(seek)
        msg.reply("Succesfully seeked!")
        
    }
}