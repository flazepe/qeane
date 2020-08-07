module.exports = {
    name: 'reload',
    ownerOnly: true,
    category: "owner",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language).commands.reload, commandStr = client.languages.get(msg.guild.id)
        if (!msg.args.join(' ')) return msg.reply(str.noArgs);
        try {
            var c = eval(`commandStr.commandNames.${commandName}`) || eval(`commandStr.aliases.${commandName}`)
        } catch {
            return;
        }
        if (!c) return msg.reply(str.noCommand);
        const command = client.commands.get(c)
        delete require.cache[require.resolve(`./${command.name}.js`)];
        client.commands.delete(command.name)
        client.commands.set(command.name, require(`./${command.name}.js`))
        msg.reply(str.success
            .replace("{0}", command.name))
    }
}