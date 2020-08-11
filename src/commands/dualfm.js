const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "dualfm",
    category: "music",
    async execute(client, msg) {

        const artist = client.languages.get(msg.guild.language).commands.dual.artist
        const song = client.languages.get(msg.guild.language).commands.dual.song
        const presenter = client.languages.get(msg.guild.language).commands.dual.presenter
        const listener_peak = client.languages.get(msg.guild.language).commands.dual.listenerpeak
        const listeners = client.languages.get(msg.guild.language).commands.dual.listeners
        fetch("https://api.dualfm.net/stats").then(res => res.json()).then(res => {
            let fields = [
                { name: song, value: `${res.now.song}`, inline: true },
                { name: artist, value: `${res.now.artist}`, inline: true },
                { name: presenter, value: `${res.presenter.username}`, inline: true },
                { name: listeners, value: `${res.listeners.current}`, inline: true }
            ]
            const embed = new MessageEmbed()
                .setTitle('DualFM')
                .addFields(fields)
                .setColor('#cf6fcb')

            msg.reply("", embed)

        });
    }
}