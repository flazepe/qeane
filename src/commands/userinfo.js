module.exports = {
    name: "userinfo",
    aliases: ['ui'],
    category: "info",
    async execute (client,msg) {
        let args = msg.args
        let member;
        if (args.join(' ')) {
            member = msg.mentions.members.first() || client.functions.findByID(msg.guild,msg.args.join(' '))
        } else {
            member = msg.member
        }
        const premium = client.db.get(`premium.${user.id}.active`)
        if (!member) return msg.channel.send('Usage: ``ui [user id/@mention]')
        let user=member.user
        let badges = require('../functions/badges')(member)
        let roles = member.roles.cache.filter(r => r.id !== msg.guild.id).map(r => r).join(', ')
        if (!roles[0]) roles = "No roles"
        let permissions = member.permissions.toArray().map(p => p).join(', ')
        let fields = [
            {name: "User Tag", value: user.tag, inline: true},
            {name: "User Badges", value: badges, inline: true},
            {name: "User ID", value: user.id, inline: true},
            {name: "Nickname", value: member.nickname||"No nicnkame", inline: true},
            {name: "Bot?", value: user.bot?"Yes":"No", inline: true},
            {name: "Joined at", value: new Date(member.joinedTimestamp), inline: true},
            {name: "Boosting?", value: member.premiumSinceTimestamp?"Yes":"No", inline: true},
            {name: "Boosting since", value: member.premiumSinceTimestamp?new Date(member.premiumSinceTimestamp):"Not boosting", inline: true},
            {name: "Permissions", value: permissions, inline: false},
            {name: "Role list", value: roles.length>1024?`Too much roles to display. Try using \`\`${client.prefixes.get(msg.guild.id) || "info-"}userinfo ${user.id} role list\`\``:roles, inline: roles.length>1024?true:false},
            {name: "Premium", value: premium}
        ]
        
        if (args[1]) {
            args=args.slice(1).join(' ').toLowerCase()
            for (let i=0;i<fields.length;i++) {
                let f = fields[i]
                if (args === f.name.toLowerCase()) {
                    if (args === "role list") {
                        return msg.reply("",{embed: {title: f.name, description: roles.length>2000?"Sorry, but I can't display role list for this user":roles}})
                    } else {return msg.reply("",{embed: {title: f.name, description: f.value}})}
                }
         }
        }
        msg.reply("",{embed: {title: "User info", fields: fields, thumbnail: {url: member.user.avatarURL({size: 2048, format: "png"})}}})
    }
}
