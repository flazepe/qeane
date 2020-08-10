module.exports = (client) => {
    setInterval(() => {
        client.db.get('reminders').forEach(r => {
            r = r[0]
            if (!r) return;
            if (r.timelimit < Date.now()) {
                r.channel.send(`<@!${r.user.id}>, you wanted me to remind you: ${r.text}`)
                delete client.db.get('reminders')[r]
            }
        })
    }, 5000)
}