module.exports = {
	name: 'meme',
  aliases: ['memes'], 
  category: "fun",
	async execute (client,msg) {
              const meme = await client.ksoft.images.meme({nsfw: false});
              msg.reply("",{embed:{
                color: client.functions.randomColor(),
                image: {url: meme.url},
                description: `[Link to the image](${meme.url})`
              }}) 
                 
	}
};

