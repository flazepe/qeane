module.exports = async (client,msg) => {
    if (!msg.guild || msg.channel.type === "dm" || msg.author === client.user || !msg.content || msg.webhookID) return;
    if (!msg.content) return;
    client.snipes.set(msg.channel.id, {
      content: msg.content,
      user: msg.author,
      timestamp: Date.now()
    })
}