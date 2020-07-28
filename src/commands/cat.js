module.exports = {
    name: 'cat',
    category: "fun",
    async execute(_client, msg) {
        require('axios').get('https://api.thecatapi.com/v1/images/search').then(res => msg.reply("", { embed: { description: "Meow!", image: { url: res.data[0].url } } }))
    }
}