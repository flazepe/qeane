module.exports = {
    name: "bassboost",
    aliases: ['bb'],
    category: "music",
    async execute(client, msg) {
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply("Woops, nothing is playing right now!")
        if (!msg.member.voice.channel) return msg.reply("Woops, you have to be in a voice channel!")
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply("Woops, you have to be in my voice channel!")
        let gain = parseInt(msg.args[0])
        if (isNaN(gain)) return msg.reply("Please provide a valid number between 0 and 8")
        if (gain < 0 || gain > 8) return msg.reply("Please provide a number between 0 and 8!");
        serverQueue.bassboost = gain
        await serverQueue.player.setEqualizer(client.functions.getEq(serverQueue.bassboost));
        msg.reply("Bass boosted! Please wait a few seconds for the effect to apply")
    } //o https://corynth.is-inside.me/7uq10nSL.png 
}//what are you doing  live share moment