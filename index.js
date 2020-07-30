const { Client } = require('discord.js-light')
const { Shoukaku } = require('shoukaku')
const startBot = require('./src/index')

const LavalinkServer = [{ name: 'node', host: "62.171.171.107", port: 7778, auth: "youwilltpass", }];
const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };

class Qeane extends Client {
    constructor(opts) {
        super(opts);
        this.shoukaku = new Shoukaku(this, LavalinkServer, ShoukakuOptions);
    }

    login(token) {
        this._setupShoukakuEvents();
        this._setupClientEvents();
        return super.login(token);
    }

    _setupShoukakuEvents() {
        this.shoukaku.on('ready', (name) => console.log(`Lavalink Node: ${name} is now connected`));
        // You must handle error event
        this.shoukaku.on('error', (name, error) => console.log(`Lavalink Node: ${name} emitted an error.`, error));
        this.shoukaku.on('close', (name, code, reason) => console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`));
        this.shoukaku.on('disconnected', (name, reason) => console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`));
    }

    _setupClientEvents() {
        startBot(this)
    }
}

new Qeane({
    disableMentions: "everyone",
    token: require('./config.json').token,
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] },
    enablePermissions: true
})
    .login("NzI3MTYzMDk3MDI2MDAzMDA0.Xvn1aA.2jfJn0LqOo0COydCmxeJKJ58_XE")
    .catch(console.error);