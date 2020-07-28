module.exports = {
    name: 'slap',
    category: "fun",
    async execute (client,msg) {
        require('axios').get('https://weebs4life.ga/api/slap').then(res => {
            let member;
            if (msg.args.join(' ')) {
                member = msg.mentions.members.first() || client.functions.findByID(msg.guild,msg.args.join(' '))
              } else {member = {user: client.user}}
         let title = `${msg.author.tag} slaps ${member.user.tag}`
            msg.reply("",{embed:{image: {url: res.data.url}, title: title}})})
    }
}