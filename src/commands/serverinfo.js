module.exports = {
    name: "serverinfo",
    aliases: ['si'],
    category: "info",
    async execute (client,msg){
      let args = msg.args
        let guild = msg.guild
        let owner = await guild.members.fetch({id:guild.ownerID})
        let members = {online: 0,idle: 0, dnd: 0, offline: 0, unknow: 0, humans: 0, bots: 0}
        guild.members.cache.forEach(m => {
            if (m.presence.status=='online') {members.online++}
            else if (m.presence.status=='idle') {members.idle++}
            else if (m.presence.status=='dnd') {members.dnd++}
            else if (m.presence.status=='offline') {members.offline++}
            else {members.unknow++}
            if (m.user.bot) {members.bots++} else {members.humans++}
        })
        let channels = {text:0, voice:0, categories:0,unknow:0}
        guild.channels.cache.forEach(c => {
          if (c.type === "text") {channels.text++} 
          else if (c.type === "voice") {channels.voice++} 
          else if (c.type === "category") {channels.categories++} 
          else {channels.unknow++}
        })
        let rolelist = guild.roles.cache.map(r => r).join(', ')
        let channellist = guild.channels.cache.filter(c => c.type === "text").map(c => c).join(', ')
        let emojilist = guild.emojis.cache.map(e => e).join(', ')
        let fields = [
          {name: "Server name", value: guild.name, inline: true},
          {name: "Server ID", value: guild.id, inline: true},
          {name: "Server region", value: guild.region, inline: true},
          {name: "Member count", value: guild.memberCount, inline: true},
          {name: "Members stats", value: `<:online:707912962605842482> ${members.online}, <:idle:707912947271335937> ${members.idle}, <:dnd:707912919635198064> ${members.dnd}, <:offline:707912934763790378> ${members.offline}, Unknown ${members.unknow}\nHumans: ${members.humans}, Bots: ${members.bots}`, inline: true},
          {name: "Large server", value: guild.large?"Yes":"No", inline: true},
          {name: "Default notification level", value: guild.defaultmsgNotifications, inline: true},
          {name: "Owner", value: owner.nickname?`${owner.nickname} (${owner.user.tag})`:owner.user.tag, inline: true},
          {name: "Created at", value: guild.createdAt, inline: true},
          {name: "Role count", value: guild.roles.cache.size, inline: true}, 
          {name: "Chanels stats", value: `Text: ${channels.text}, Voice: ${channels.voice}, Categories, ${channels.categories}, Unknown: ${channels.unknow}`, inline: true},
          {name: "Emoji count", value: guild.emojis.cache.size,inline: true},
    
          {name: "Emoji list", value: emojilist?emojilist.length>1024?`Too much emojis to display. Try doing \`\`serverinfo emoji list\`\``:emojilist:"No emojis", inline: true},
          {name: "Channel list", value: channellist.length>1024?`Too much channels to display. Try doing \`\`serverinfo channel list\`\``:channellist, inline: channellist.length>1024?true:false},  
          {name: "Role list", value: rolelist.length>1024?`Too much roles to display. Try doing \`\`serverinfo role list\`\``:rolelist, inline: rolelist.length>1024?true:false}
      ]

      if (args.join(' ')) {
        args=args.join(' ').toLowerCase()
        for (let i = 0;i<fields.length;i++) {
          let f = fields[i]
          if (args === f.name.toLowerCase()) {
            if (args === "role list") {
              return msg.reply("",{embed: {title: f.name, description: rolelist.length>2000?"Sorry, but I can't display role list for your server.":rolelist}})
            } else if (args === "channel list") {
              return msg.reply("",{embed: {title: f.name, description: channellist.length>2000?"Sorry, but I can't display channel list for your server.":channellist}})
            } else if (args === "emoji list") {
              return msg.reply("",{embed: {name: f.name, description: emojilist.length>2000?"Sorry, but I can't display emoji list for your server":emojilist}})
            } else {
              return msg.reply("",{embed: {title: f.name, description: f.value}})
            }
          }
        }
      }
        msg.reply("",{embed: {
            title: "Server info",
            thumbnail: {url: guild.iconURL({dynamic: true})},
            fields: fields
        }})
    }
}
