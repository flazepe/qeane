module.exports = {
    name: 'ping',
    category: "info",
    async execute(client, msg) {
        msg.reply(client.languages.get(msg.guild.id).commands.ping.pong
            .replace("{0}", client.ws.ping))
    }
}
