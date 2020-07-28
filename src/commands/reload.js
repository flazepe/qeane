module.exports = {
    name: 'reload',
    ownerOnly: true,
    category: "owner",
    async execute(client,msg) {
        if (!msg.args.join(' ')) return msg.reply("Please provide command name");
        const command = client.commands.get(msg.args.join(' ')) || client.commands.get(client.aliases.get(msg.args.join(' ')))
        if (!command) return msg.channel.send('Invalid command') 
        delete require.cache[require.resolve(`./${command.name}.js`)];
        client.commands.delete(command.name)
        client.commands.set(command.name, require(`./${command.name}.js`)) 
        msg.channel.send('Reloaded command **' +command.name+'** !') 
    }
}