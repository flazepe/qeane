module.exports = {
    name: 'ping',
    category: "info",
    async execute(client, msg) {
        msg.reply(`Pong! **${client.ws.ping}** ms!`)
    },
}
