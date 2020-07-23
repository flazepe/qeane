module.exports = {
    name: "volume",
    category: "music",
    async execute (client,msg) {
        let player = client.music.players.get(msg.guild.id)
        if (!player) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (player.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        let vol = parseInt(msg.args.join(' '))
        if (!vol) return msg.reply("Woops, you don't seem to have provided a volume!")
        if (vol<1 || vol>250) return msg.reply("Woops, please make sure to provide a volume between 1 and 250!")
        player.setVolume(vol)
        msg.reply(`volume set to **${vol}***!`)
    }
}