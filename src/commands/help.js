module.exports = {
    name: 'help',
    category: "help",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language).commands.help
        let commandNames = client.languages.get(msg.guild.language).commandInvertedNames
        let commands;
        if (!client.config.ownerID.includes(msg.author.id)) {
            commands = client.commands.filter(c => !c.ownerOnly)
        } else {
            commands = client.commands
        }
        let fields = [], fun = [], owner = [], utility = [], help = [], music = [], moderation = [], info = [], setup = []
        commands.forEach(c => {
            eval(`${c.category}.push("**${eval(`commandNames.${c.name}`)}**")\n${c.category}.sort()`)
        })
        fields.push({ name: str.fun, value: fun.join(', '), inline: true })
        fields.push({ name: str.help, value: help.join(', '), inline: true })
        fields.push({ name: str.info, value: info.join(', '), inline: true })
        if (client.config.ownerID.includes(msg.author.id)) fields.push({ name: str.owner, value: owner.join(', '), inline: true })
        fields.push({ name: str.music, value: music.join(', '), inline: true })
        fields.push({ name: str.moderation, value: moderation.join(', '), inline: true })
        fields.push({ name: str.setup, value: setup.join(', '), inline: true })
        fields.push({ name: str.utility, value: utility.join(', '), inline: true })
        fields.push({ name: str.links, value: `[${str.invite}](https://discord.com/api/oauth2/authorize?client_id=742670668646055967&permissions=3238918&scope=bot) | [${str.support}](https://discord.gg/nXg4Yh7) | [${str.vote}](https://top.gg/bot/742670668646055967/vote) | [${str.github}](https://github.com/lumap/qeane)` })
        msg.reply("", {
            embed: {
                color: client.functions.randomColor(),
                author: {
                    icon_url: client.functions.avatar(msg.guild.me),
                    name: str.list
                },
                description: str.datsalist,
                fields: fields,
                footer: {
                    text: str.c
                }
            }
        })



    }
}
