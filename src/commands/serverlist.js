module.exports = {
    name: 'serverlist',
    ownerOnly: true,
    category: "owner",
    async execute(client,msg) {
 let string = '';
client.guilds.cache.forEach(guild => {
    string += `${guild.name} (${guild.id})\n`;})
    
    
    msg.author.send(string)
    msg.channel.send('Server list sent in dm!');
   },
} 
