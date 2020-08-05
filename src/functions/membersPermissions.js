module.exports = function (member) {
    let str = []
    let role = member.permissions.serialize()
    if (role.ADMINISTRATOR) {
        str = "All permissions"
        return str
    }
    if (role.CREATE_INSTANT_INVITE) str.push("Create Invites")
    if (role.KICK_MEMBERS) str.push("Kick Members")
    if (role.BAN_MEMBERS) str.push("Ban Members")
    if (role.MANAGE_CHANNELS) str.push("Manage Channels")
    if (role.MANAGE_GUILD) str.push("Manage Server")
    if (role.ADD_REACTIONS) str.push("Add Reactions")
    if (role.VIEW_AUDIT_LOG) str.push("View Audit Logs")
    if (role.PRIORITY_SPEAKER) str.push("Priority Speaker")
    if (role.STREAM) str.push("Stream")
    if (role.VIEW_CHANNEL) str.push("View Channels")
    if (role.SEND_MESSAGES) str.push("Send Messages")
    if (role.SEND_TTS_MESSAGES) str.push("Send TTS Messages")
    if (role.MANAGE_MESSAGES) str.push("Manage Messages")
    if (role.FLAGSEMBED_LINKS) str.push("Embeds")
    if (role.ATTACH_FILES) str.push("Attach Files")
    if (role.READ_MESSAGE_HISTORY) str.push("View Message History")
    if (role.MENTION_EVERYONE) str.push("Mention everyone/here")
    if (role.USE_EXTERNAL_EMOJIS) str.push("Use External Emojis")
    if (role.VIEW_GUILD_INSIGHTS) str.push("View Guild Insights")
    if (role.CONNECT) str.push("Connect")
    if (role.SPEAK) str.push("Speak")
    if (role.MUTE_MEMBERS) str.push("Mute Members")
    if (role.DEAFEN_MEMBERS) str.push("Defean Members")
    if (role.MOVE_MEMBERS) str.push("Move Members")
    if (role.USE_VAD) str.push("Use Voice Activity Detection")
    if (role.CHANGE_NICKNAME) str.push("Change Nickname")
    if (role.MANAGE_NICKNAMES) str.push("Manage Nicknames")
    if (role.MANAGE_ROLES) str.push("Manage Roles")
    if (role.MANAGE_WEBHOOKS) str.push("Manage Webhooks")
    if (role.MANAGE_EMOJIS) str.push("Manage Emojis")
    return str.join(', ')
}
