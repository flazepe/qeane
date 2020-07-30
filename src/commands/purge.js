module.exports = {
    name: 'purge',
    category: "moderation",
    async execute(_client, msg) {
        if (!msg.args.join(' ')) return msg.reply('I can\'t purge nothing!')

        if (!msg.member.permissions.has("MANAGE_msgS")) return msg.reply("Woops, you can't manage msgs!")
        let amount = msg.args[0]
        if (isNaN(amount)) return msg.reply("You need to tell me a number of msgs I have to purge!")
        amount = Number(amount)
        if (!amount || amount < 2 || amount > 100) return msg.reply('Invalid number! Please provide a number between 1 and 99')
        const fetched = await msg.channel.msgs.fetch({
            limit: amount,
        });
        msg.channel.bulkDelete(fetched)
        msg.reply("msgs succesfully purged!").then(m => m.delete({ timeout: 5000 }))
    },
}
