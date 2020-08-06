module.exports = (client) => {
    const DBL = require("dblapi.js");
    const dbl = new DBL(require('../..//config.json').dbl, { webhookPort: 3001, webhookAuth: 'bestpasswdever' }, client);
    dbl.webhook.on('ready', hook => {
        console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });
    dbl.webhook.on('vote', vote => {
        client.logs.send(`User with id ${vote.user} just voted!`)
        client.db.set(`votes.${vote.user}`, Date.now() + 43200000)
        client.users.fetch(vote.user).then(u => { u.send("Thanks for voting for Qeane!") })
    })
    dbl.postStats(client.guilds.cache.size, client.ws.shards.id, client.ws.shards.size);
    setInterval(() => {
        dbl.postStats(client.guilds.cache.size, client.ws.shards.id, client.ws.shards.size);
    }, 1800000);

    client.dbl = dbl

    console.log('==SETUP== dbl succesfully loaded!')
}