module.exports = {
    name: 'kiss',
    category: "fun",
    async execute (client,msg) {
        require('axios').get('https://weebs4life.ga/api/kiss').then(res => {
            let member = msg.mentions.members.first() || client.functions.findByID(msg.guild,msg.args.join(' ')) || msg.guild.me
         let title = `${msg.author.tag} kisses ${member.user.tag}`
            msg.reply("",{embed:{image: {url: res.data.url}, title: title}})})
    }
}