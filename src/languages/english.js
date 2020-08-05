//dont touch this
function swap(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}
let obj = {
    name: "english",
    commands: {
        //do NOT touch string/command names, just translate the text after the :s
        avatar: {
            clickToDownload: "Click[here]({0}) to download this awesome avatar!" //{0}=avatar link
        },
        ban: {
            usage: "\nUsage: ``ban <member> [reason]``",
            noBanPerm: "Eh! Don't even try to ban if you can't!",
            botCantBan: "Erm, I cannot ban members, please give me the BAN_MEMBERS permissions!",
            noArgs: "I can't ban the air... Please mention the user to ban",
            noUser: "I might be blind, but I cannot find this user!",
            serverOwner: "Why are you trying to ban the server owner!?",
            notBannable: "Ah, I can't ban him... Make sure one of my role is above this member's highest role.",
            youreBanned: "You just got banned from **{0}** by **{1}**", //{0}=guild name  {1}=message author tag
            noReason: "No reason",
            memberBanned: "Member succesfully yeeted from this server!"
        },
        bassboost: {
            invalidNumber: "Please provide a valid number between -8 and 8\nEARRAPE WARNING",
            success: "Bass boosted! Please wait a few seconds for the effect to apply..."
        },
        cat: {
            meow: "Meow! Here's a cat picture (cats are the best, don't trust dogs)"
        },
        dog: {
            woof: "Woof! Here's a dog picture (ew, cats better)"
        },
        eval: {
            tokenLeak: "Woops, token leaked",
            tooLongText: "Text too long! Sending result into the console...",
            success: "The eval succesfully finished without any error!",
            failure: "Woops, an error occurs",
            input: "Input: ",
            output: "Output: "
        },
        fox: {
            //this command oes not have any text, next
        },
        help: {
            //categories names, they are only used in the help command lol
            fun: "Fun",
            help: "Help",
            info: "Info",
            owner: "Owner",
            music: "Music",
            moderation: "Moderation",
            setup: "Setu",
            utility: "Utility",
            //links is not a category
            links: "Links",
            invite: "Invite",
            support: "Support server",
            premium: "Get Premium",
            vote: "Vote for Qeane",
            github: "GitHub Repo",
            list: "Qeane's List of Commands",
            datsalist: "Here is a list of my commands",
            c: "Created my Lumap#0001 | Translated to English by Lumap#0001" //put your discord tag ofc
        },
        hug: {
            hugs: "**{0}**hugs **{1}**" //{0}=message author tag  {1}=mentioned user
        },
        kick: {
            usage: "\nUsage: ``kick <member> [reason]``",
            noKickPerm: "Don't even try to kick members thanks to me, you can't kick members yourself...",
            botCantKick: "It seems that I can't kick members, please give me the KICK_MEMBERS permission.",
            noArgs: "I can't kick no one, please mention someone to kick...",
            noUser: "Sorry, I cannot find him...",
            serverOwner: "Are you trying to kick the owner? Nice try bud.",
            notKickable: "It doesnt seems that I can kick him. Make sure one of my role is above this member's highest role.",
            youreKicked: "You just got kicked from **{0}**by **{1}**", //{0}=guild name  {1}=message author tag
            noReason: "No reason",
            memberKicked: "Member succesfully kicked out of here!"
        },
        kiss: {
            kisses: "**{0}** kisses **{1}** OwO"//{0}=message author tag  {1}=mentioned user
        },
        language: {
            usage: "__Usage:__\n-To get the list of my languages: ``language list``\n-To change my language: ``language <LANG>``",
            lackOfPermissions: "Please ask your administrators if you wanna change my language here",
            invalidLanguage: "Sorry, but this lang does not exist or i'm not translated into this language yet!",
            success: "Language changed to **{0}**!" //{0}=language
        },
        loop: {
            types: {
                queue: "queue",
                track: "track",
                disable: "disable"
            },
            usage: "\n__Usage:__\n-To loop the queue: ``loop queue``\n-To loop the current track: ``loop track``\n-To disable the loop: ``loop disable``", //
            queue: "The queue will now repeat! Enjoy your music~!",
            track: "The current track will now repeat! Enjoy vibing~",
            disable: "Loop disabled!"
        },
        meme: {
            imgurl: "[Link to dat awesome meme]({0})" //{0}=image url
        },
        neko: {
            heresANeko: "Here's a neko for **{0}**", //{0}=msg.author
            grabbedVia: "Neko grabbed via the weebs4life.ga api (its sfw)"
        },
        nlr: {
            title: "Now Playing: Next Level Radio",
            desc: "Song: {0} \nAuthor: {1} \nPresenter: {2} \n\n > Unique Listeners: {3} \n > Total Listeners: {4} ", //this one is self-explanatory i guess
        },
        nowplaying: {
            //no string on this one, next
        },
        pat: {
            pats: "**{0}** pats **{1}**"//{0}=message author tag  {1}=mentioned user
        },
        pause: {
            alreadyPaused: "Woops, it seems like the current track is already paused!",
            success: "Successfully paused the current track! Use the **resume** command to resume it!"
        },
        ping: {
            pong: "Ping? Pong! **{0}**ms!" //{0}=ws pings
        },
        play: {
            noSong: "I might be dumb, but you didnt gave me any song to play...",
            noSongFound: "I'm probably blind, but i wasn't able to find that song!",
            queueEEmpty: "Queue is empty, leaving the voice channel...",
            playlist: {
                added: "Playlist added",
                desc: "Title: **{0}**\nSongs: **{1}**" //no explanation needed i guess
            },
            track: {
                added: "Track added",
                desc: "Track: **[{0}]({1})**\nDuration: **{2}**\nArtist: **{3}**"
            },
            player: {
                disconnect: "Please do not disconnect me from a voice channel if you can use the stop command. Clearing the queue...",
                error: "Looks like something went terribly wrong: {0}",
                nodeDisconnect: "Woops, I cn not play music because my node was disconnected. Please contact my owner so it can fix this error!"
            }
        },
        prefix: {
            noPerms: "Please ask your administrators if you wanna change my prefix here",
            noArgs: "Please provide a new prefix.",
            success: "Prefix changed to **{0}** for this server!" //{0}=prefix
        },
    },
    msgevent: {
        //used in src/events/msg.js
        prefix: "My prefix in this server is **{0}**, type ``{0}help`` to get a command list!", //{0}=prefix
        error: "Woopsie doopsie, something went wrong! You can find the error right below.If you can't figure how to get around this issue, please go to my support server and report this error!"
    },
    aliases: {
        //"the alias you want:"the english command name"
        pfp: "avatar",
        av: "avatar"
    },
    commandNames: {
        //"translated name:"original name"
        avatar: "avatar",
        ban: "ban",
        bassboost: "bassboost",
        cat: "cat",
        dog: "dog",
        eval: "eval",
        fox: "fox",
        help: "help",
        hug: "hug",
        kiss: "kiss",
        language: "language",
        loop: "loop",
        meme: "meme",
        neko: "neko",
        nlr: "nlr",
        nowplaying: "nowplaying",
        ownerprefix: "ownerprefix",
        pat: "pat",
        pause: "pause",
        ping: "ping",
        play: "play",
        prefix: "prefix",
        premium: "premium",
        purge: "purge",
        queue: "queue",
        reload: "reload",
        restart: "restart",
        resume: "resume",
        say: "say",
        seek: "seek",
        serverinfo: "serverinfo",
        serverlist: "serverlist",
        shell: "shell",
        shuffle: "shuffle",
        skip: "skip",
        slap: "slap",
        stats: "stats",
        stop: "stop",
        tag: "tag",
        userinfo: "userinfo",
        volume: "volume",
        weather: "weather"
    },
    music: {
        //these strings are used for several commands, so i put it here so you dont have to translate these strings 1k times
        queueEmpty: "Woops, nothing is playing right now!",
        noVc: "Woops, you have to be in a voice channel!",
        notSameVc: "Woops, you have to be in my voice channel!",
        live: "Live stream",
        np: {
            title: "Now Playing:",
            desc: "Track: **[{0}]({1})**\nTime: **{2}**\nArtist: **{3}**"
        }
    }
}
obj.commandInvertedNames = swap(obj.commandNames)
module.exports = obj