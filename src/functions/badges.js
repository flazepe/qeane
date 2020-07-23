const Discord = require('discord.js')
/**
 * Returns badges of a member
 * @param {Discord.GuildMember} member - Guild Member
 */
module.exports = (member) => {
    let badges = {
        staff: "<:staff:715937227229626448> ",
        partner: "<:partner:715937227280089088> ",
        hypesquad: "<:hypesquad:715937227452055552> ",
        bughunter: "<:bh:715937226839556117> ",
        bravery: "<:bravery:715937226936156198> ",
        brillance: "<:brillance:715937227015847948> ",
        balance: "<:balance:715938112177569853> ",
        earlySupporter: "<:earlysupporter:715937226844012555> ",
        shinyBughunter: "<:shinybh:715937226801938486> ",
        verifiedBot: "Verified Bot",
        botDev: "<:botdev:715937226873372816>"
    }
    let userbadges = member.user.flags.serialize()
    let badge = ""
    if (userbadges.DISCORD_EMPLOYEE) badge += badges.staff
    if (userbadges.DISCORD_PARTNER) badge += badges.partner
    if (userbadges.HYPESQUAD_EVENTS) badge += badges.hypesquad
    if (userbadges.BUGHUNTER_LEVEL_1) badge += badges.bughunter
    if (userbadges.HOUSE_BRAVERY) badge += badges.bravery
    if (userbadges.HOUSE_BRILLANCE) badge += badges.brillance
    if (userbadges.HOUSE_BALANCE) badge += badges.balance
    if (userbadges.EARLY_SUPPORTER) badge += badges.earlySupporter
    if (userbadges.BUGHUNTER_LEVEL_2) badge += badges.shinyBughunter
    if (userbadges.VERIFIED_BOT) badge += badges.verifiedBot
    if (userbadges.VERIFIED_DEVELOPER) badge += badges.botDev
    if (!badge) badge = "No Badges"
    return badge
}