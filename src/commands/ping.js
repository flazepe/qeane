module.exports = {
    name: 'ping',
    category: "info",
    async execute(client,msg) {
        msg.channel.send(`Pong! **${client.ws.ping}** ms!`)
    },
}
