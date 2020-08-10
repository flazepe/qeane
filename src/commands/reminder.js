module.exports = {
    name: "reminder",
    category: "utility",
    async execute(client, msg) {
        let args = msg.args
        let timestamp = require('timestamp-to-ms')(args[1])
        if (!args[2] || !timestamp) return msg.reply("Usage: ``reminder <time> <something>``")
        client.db.push('reminders', [{ timelimit: timestamp + Date.now(), channel: msg.channel, user: msg.author, text: args.slice(2).join(' ') }])
    }
}