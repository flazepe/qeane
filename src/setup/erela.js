const Discord = require("discord.js");
const fetch = require('node-fetch')
/**
 * Setups erela.js
 * @param {Discord.Client} client - The client
 * 
 */
module.exports = function (client) {
    const { ErelaClient } = require("erela.js");
    const nodes = [
        {
            host: "95.111.235.134",
            port: 7777,
            password: "Zk9MEhPVf0V9iVeLN5Uo5m0cXlQa3j",
        }
    ]
    client.music = new ErelaClient(client, nodes);
    client.music.on("nodeConnect", () => console.log("New node connected"));
    client.music.on("nodeError", (_node, error) => console.log(`Node error: ${error.message}`));
    client.music.on("trackStart", async (player, track) => {
        if (player.npmsg) {player.npmsg.delete()}
        let time = client.functions.duration(track.duration)
        let m = await player.textChannel.send({embed: {
        color: client.functions.randomColor(),
        title: "Now playing:",
        description: `Track: **${track.title}**\nDuration: **${track.isStream?"Live stream":time}**\nArtist: **${track.author}**`
    }})
    player.npmsg=m
    });
    client.music.on("queueEnd", player => {
        if (player.npmsg) {player.npmsg.delete()}
        player.textChannel.send("Queue has ended.")
        client.music.players.destroy(player.guild.id);
    });

    console.log("==SETUP== erela.js succesfully loaded!")
}