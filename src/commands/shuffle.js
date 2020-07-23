module.exports = {
    name: "shuffle",
    category: "music",
    async execute (client,msg) {
        let player = client.music.players.get(msg.guild.id)
        if (!player) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (player.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        player.queue=[player.queue[0],...shuffle(player.queue)]
        msg.reply('Queue shuffled!')
    }
}