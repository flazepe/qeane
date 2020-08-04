module.exports = {
    name: 'neko',
    category: "fun",
    async execute(_client, msg) {
        let str = client.languages.get(msG.guild.language).commands.neko
        require('axios').get('https://weebs4life.ga/api/neko').then(res => {
            let title = str.heresANeko
                .replace("{0}", msg.author.tag)
            let description = str.grabbedVia
            msg.reply("", { embed: { image: { url: res.data.url }, title: title, description: description } })
        })
    }
}