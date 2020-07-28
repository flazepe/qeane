module.exports = {
	name: 'ban',
	aliases: ['b'],
	category: "moderation",
	async execute(client, msg) {
		if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("Woops, you can't ban members!")
		if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("Woops, I can't ban members!")
		if (!msg.args.join(' ')) return msg.reply("Please provide a user to ban! (mention or user id)")
		const ownerID = client.config.ownerID
		let member = msg.mentions.members.first() || msg.guild.members.cache.get(msg.args.join(' '))
		if (!member) {
			return msg.reply("Woops, user not found!");
		}
		if (member.user.id === ownerID) return msg.reply("I can't ban my dev!")


		member.user.send(`You just got banned from **${msg.guild.name}** by ${msg.author.tag}`)
		member.ban({ days: 7, reason: msg.args.slice(1).join(' ') || "No reason" })
		msg.reply("Member succesfully banned!")
	},
};
