module.exports = {
    name: 'ping',
    aliases: ['p'],
    category: "info",
    async execute(client,msg) {
        msg.channel.send(`Pong! **${client.ws.ping}** ms!`)
    },
}
