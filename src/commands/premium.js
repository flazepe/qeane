module.exports = {
    name: "premium",
    category: "help",
    async execute (client,msg) {
        if (client.db.get(`premium.${msg.author.id}.active`)) return msg.reply("Thanks for buying Qeane Premium! You now have access to music commands, and the cooldown between commands is gone!!")
        msg.reply("",{embed: {
            title: "Qeane Premium",
            desctiption: "Here are some informations about Qeane Premium",
            color: client.functions.randomColor(),
            fields: [
                {name: "Why should I buy Qeane Premium?", value: "You're absolutely not forced to buy Qeane Premium in order to use the bot, but being a premium user helps us to growth and stay alive. It's just a way to support us."},
                {name: "How do I buy Qeane Premium?", value: "We use Donate Bot to manage Qeane Premium, so you can:\n-Go to the support server and type \"donate\"\n-Click the \"Buy Premium\" link in the help menu\n-Click the Donate button on my top.gg page"},
                {name: "How much does it cost?", value: "Qeane Premium only costs 3.99€ per month, this means that if only one person would buy premium, I'll be able to host Qeane for free!"},
                {name: "What will I unlock if I buy premium?", value: "If you buy premium, you will unlock music commands! You will also not have to wait 3 seconds between commands"}
            ]
        }})
    }
}