module.exports = {
    name: "channelinfo",
    aliases: ['ci'],
    category: "info",
    async execute (_client,msg) {
        let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(msg.args[0])
        if (!channel) return msg.reply("Channel not found! Please make sure to mention a channel or provide a cannel/voice channel/category id!")
        let embed={
            title: null,
            fields: [],
            thumbnail: {
                url: msg.guild.iconURL({dynamic: true})
            }
        }
        if (channel.type === 'category') {
            embed = {
                title: "Category Info",
                fields: [
                    {name: "Category Name", value: channel.name, inline: true},
                    {name: "Category ID", value: channel.id, inline: true},
                    {name: "Channels", value: channel.children.map(c => c)},
                    {name: "Created at", value: new Date(channel.createdTimestamp),inline: true}
                ]
            }
        } else if (channel.type === 'text') {
            embed = {
                title: "Text Channel Info",
                fields: [
                    {name: "Channel Name", value: channel.name, inline: true},
                    {name: "Channel ID", value: channel.id, inline: true},
                    {name: "Category", value: channel.parentID?msg.guild.channels.cache.get(channel.parentID).name:"Uncategorized", inline: true},
                    {name: "NSFW", value: channel.nsfw?"Yes":"No", inline: true},
                    {name: "Last msg ID", value: channel.lastmsgID?channel.lastmsgID:"No msgs have been sent so far in this channel", inline: true},
                    {name: "Last Pin", value: channel.lastPinTimestamp?new Date(channel.lastPinTimestamp):"No msgs have been pinned so far in this channel", inline: true},
                    {name: "Created at", value: new Date(channel.createdTimestamp),inline: true}
                ]
            }
        } else if (channel.type === 'voice') {
            embed = {
                title: "Voice Channel Info",
                fields: [
                    {name: "Channel Name", value: channel.name, inline: true},
                    {name: "Channel ID", value: channel.id, inline: true},
                    {name: "Category", value: channel.parentID?msg.guild.channels.cache.get(channel.parentID).name:"Uncategorized", inline: true},
                    {name: "User Limit", value: channel.userLimit>0?channel.userLimit:"No limit", inline: true},
                    {name: "Bitrate", value: channel.bitrate, inline: true},
                    {name: "Members", value: channel.members.size>0?channel.members.map(m => m):"No one is connected", inline: true},
                    {name: "Created at", value: new Date(channel.createdTimestamp),inline: true}
                ]
            }
        } else {
            return msg.reply("Sorry, but I can't show info for this channel.")
        }
        
      if (msg.args[0]) {
        args=msg.args.slice(1).join(' ').toLowerCase()
        for (let i = 0;i<embed.fields.length;i++) {
          let f = embed.fields[i]
          if (args === f.name.toLowerCase()) {
              return msg.reply("",{embed:{title: f.name, description: f.value}})
          }
        }
      }
      msg.reply("",{embed:embed})
    }
}
