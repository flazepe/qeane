module.exports = {
    name: 'help',
    aliases: ['h'],
    category: "help",
    async execute(client, msg) {
        let commands;
        if (!client.config.ownerID.includes(msg.author.id)) {
            commands = client.commands.filter(c => !c.ownerOnly)
        } else {
            commands = client.commands
        }
        let fields = [], fun = [], owner = [], utility = [], help = [], music = [], moderation = [], info = []
        commands.forEach(c => {
            eval(`${c.category}.push("**${c.name}**")\n${c.category}.sort()`)
        })
        fields.push({ name: "Fun", value: fun.join(', '), inline: true })
        fields.push({ name: "Help", value: help.join(', '), inline: true })
        fields.push({ name: "Info", value: info.join(', '), inline: true })
        if (client.config.ownerID.includes(msg.author.id)) fields.push({ name: "Owner", value: owner.join(', '), inline: true })
        fields.push({ name: "Music", value: music.join(', '), inline: true })
        fields.push({ name: "Moderation", value: moderation.join(', '), inline: true })
        fields.push({ name: "Utility", value: utility.join(', '), inline: true })
        fields.push({ name: "Links", value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=727163097026003004&permissions=8&scope=bot) | [Support server](https://discord.gg/nXg4Yh7) | [Buy Premium](https://donatebot.io/checkout/674514067368574976?id=f97wr8mz2X) | [Vote](https://top.gg/bot/727163097026003004/vote)` })
        msg.reply("", {
            embed: {
                color: client.functions.randomColor(),
                author: {
                    icon_url: client.functions.avatar(msg.guild.me),
                    name: "Qeane Help"
                },
                description: "Here is a list of commands I can do.",
                fields: fields,
                footer: {
                    text: "Created by Lumap#0001"
                }
            }
        })



    }
}
