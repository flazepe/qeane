module.exports = {
    name: "reminder",
    category: "utility",
    async execute(client, msg) {
        if (!msg.args[2]) return msg.reply("Usage: ``reminder <time> <something>``")
        let timestamp = require('timestamp-to-ms')(msg.args[1])
        client.db.push('reminders', [{ timelimit: timestamp + Date.now(), channel: msg.channel, user: msg.author, text: args.slice(2).join(' ') }])
    }
}