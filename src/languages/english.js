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
            invalidNumber: "Please provide a valid number between -8 and 8",
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
            c: "Created my Lumap#0001 | TraWoops, I can't kick this member! Please make sure my role is above this member's highest role!nslated to English by Lumap#0001" //put your discord tag ofc
        },
        hug: {
            hugs: "**{0}**hugs **{1}**" //{0}=message author tag  {1}=mentioned user
        },
        kick: {
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
            kisses: "**{0}** kisses **{1}**"//{0}=message author tag  {1}=mentioned user
        },
        language: {
            lackOfPermissions: "Please ask your administrators if you wanna change my language here",
            noArgs: "Please provide a language! To see a list of my languages, please do ``{0} list``",
            invalidLanguage: "Sorry, but this lang does nto exist or i'm not translated into this language yet!",
            success: "Language changed to **{0}**!" //{0}=language
        },
        loop: {
            types: {
                queue: "queue",
                track: "track",
                disable: "disable"
            },
            usage: "Usage: ``{0} <{1}>``", //{0}=translated command name  {1}=different loop types
            queue: "The queue will now repeat!",
            track: "The current track will now repeat!",
            disable: "Loop disabled!"
        },
        meme: {
            imgurl: "[Link to the image]({0})" //{0}=image url
        },
        neko: {
            heresANeko: "Here's a neko for **{0}**", //{0}=msg.author
            grabbedVia: "Neko grabbed via the weebs4life.ga api"
        },
        nlr: {
            title: "Now Playing: Next Level Radio",
            desc: "Song: {0} \nAuthor: {1} \nPresenter: {2} \n\n > Unique Listeners: {3} \n > Total Listeners: {4} ", //this one is self-explanatory i guess
        },
        nowplaying: {
            //no string on this one, next
        },
        prefix: {
            noArgs: "Please provide a new prefix.",
            success: "Prefix changed to **{0}** for this server!" //{0}=prefix
        },
        pat: {
            pats: "**{0}** pats **{1}**"//{0}=message author tag  {1}=mentioned user
        },
        pause: {
            alreadyPaused: "Woops, it seems like the current track is already paused!",
            success: "Succesfully paused the current track! Use the **resume** command to resume it!"
        },
        ping: {
            pong: "Ping? Pong! **{0}**ms!" //{0}=ws pings
        },
        play: {
            noSong: "I might be dumb, but you didnt gave me any song to play..."
        }
    },
    msgevent: {
        //used in src/events/msg.js
        prefix: "My prefix in this server is {0}, type {0} help to get a command list!", //{0}=prefix
        cooldown: "Woops, you need to wait 3 seconds between each command!",
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
        notSameVc: "Woops, you have to be in my voice channel!"
    }
}
obj.commandInvertedNames = swap(obj.commandNames)
module.exports = obj