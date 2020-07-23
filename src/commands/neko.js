module.exports = {
    name: 'neko',
    category: "fun",
    async execute (_client,msg) {
        require('axios').get('https://weebs4life.ga/api/neko').then(res => {
            let title = `Here is a neko for ${msg.author.tag}`
            let description = "Neko grabbed via the weebs4life.ga api"
            msg.reply("",{embed:{image: {url: res.data.url}, title: title, description: description}})})
    }
}