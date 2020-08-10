module.exports = async (client) => {
    setInterval(() => {
        client.db.get('reminders').forEach(async r => {
            r = r[0]
            if (!r) return;
            if (r.timelimit < Date.now()) {
                let channel = client.channels.cache.get(r.channel.id) || await client.channels.fetch(r.channel.id)
                channel.send(`<@!${r.user.id}>, you wanted me to remind you: ${r.text}`)
                delete client.db.get('reminders')[r]
            }
        })
    }, 5000)
}