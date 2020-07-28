module.exports = {
  name: 'weather',
  category: "utility",
	async execute(_client,msg) {
		const Discord = require('discord.js')
 
  if (!msg.args.join(' ') || !msg.args[1]) return msg.channel.send('Usage: ``weather <C/F> <city name>``')
  
  var weather = require('weather-js')
  let degreetype = msg.args[0]
  let city = msg.args.slice(1).join(' ')
 if (!city) return msg.channel.send('Usage: ``weather <C/F> <city name>``')
weather.find({search: city, degreeType: degreetype}, function(err, result) {
  if(err) console.log(err);
 

  
        var current = result[0].current;
        var location = result[0].location;
 
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0xffd700)
        .addFields(
            {name: 'Timezone', value: `UTC${location.timezone}`, inline: true},
        {name: 'Degree type', value: location.degreetype, inline: true},
        {name: 'Temperature',value: `${current.temperature} degrees`, inline: true},
        {name: 'Feels like',value: `${current.feelslike} degrees`, inline: true},
        {name: 'winds',value: current.winddisplay, inline: true},
        {name: 'humidity', value: `${current.humidity}%`, inline: true}
        )
      
        msg.reply("",embed);
});
 
 

    	},
};
