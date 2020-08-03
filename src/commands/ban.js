module.exports = {
	name: 'ban',
	aliases: ['b'],
	category: "moderation",
	async execute(client, msg) {
		const str = client.languages.get(msg.guild.language).commands.ban
		if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply(str.noBanPerm)
		if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply(str.botCantBan)
		if (!msg.args.join(' ')) return msg.reply(str.noArgs)
		let member = msg.mentions.members.first() || msg.guild.members.cache.get(msg.args.join(' '))
		if (!member) {
			return msg.reply(st.noUser);
		}
		if (member.id === msg.guild.id) return msg.reply(str.serverOwner)
		if (!member.bannable) return msg.reply(str.notBannable)
		member.user.send(str.youreBanned
		.replace("{0}",msg.guild.name)
		.replace("{1}", msg.author.tag))
		member.ban({ days: 7, reason: msg.args.slice(1).join(' ') || str.noReason })
		msg.reply(str.memberBanned)
	},
};
