const RadioBrowser = require('radio-browser');

module.exports = {
    name: "radio",
    aliases: ['ra'],
    category: "music",
    async execute (client,msg) {
        let premium = client.db.get(`premium.${msg.author.id}`)
        if (!premium || !premium.active) return msg.reply("Woops, music is a premium-only feature!")
        const message = msg
        const args = msg.args;
        if(!message.member.voice.channel) return message.channel.send('Please join a voice channel')

        const query = args.join(' ');
        if (!args[0]) return message.channel.send('Send a link of a radio or name.');

        const player = await client.music.players.spawn({
            guild: message.guild,
            voiceChannel: message.member.voice.channel,
            textChannel: message.channel,
            selfDeaf: true
        });

        if (args[0] === 'Upbeat'){
            await client.music.search('https://live.upbeat.pw/', message.author).then(async res => {
                switch (res.loadType) {
                case 'TRACK_LOADED':
                    player.queue.add(res.tracks[0]);
                    message.channel.send(`Added ${res.tracks[0].author}`)
                    if (!player.playing) {
                        player.play();
                    }
                }
            });
        }

        const filter = {
			limit: 1,
			by: 'name',
			searchterm: query,
		};
		let str = '';
		await RadioBrowser.getStations(filter)
			.then(data => {
				// eslint-disable-next-line no-undef
				data.forEach(item => {
					str = item.url;
				});
			});
		if (str.length === 0) return message.channel.send('Unknown radio station.');
		await client.music.search(str, message.author).then(async res => {
			switch (res.loadType) {
			case 'TRACK_LOADED':
                player.queue.add(res.tracks[0]);
                message.channel.send(`Added ${res.tracks[0].author}`)
				if (!player.playing) {
					player.play();
                }
            }
        });
    }
}