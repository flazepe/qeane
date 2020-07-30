module.exports = (client) => {
    const DBL = require("dblapi.js");
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzE2MzA5NzAyNjAwMzAwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk2MTA3MDYzfQ.OypRRYlaw1-8W8ILhHUVMjFD_SWXNwew4p1hir_lKD8', { webhookPort: 3001, webhookAuth: 'bestpasswdever' }, client);
    dbl.webhook.on('ready', hook => {
        console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });
    dbl.webhook.on('vote', vote => {
        client.db.set(`votes.${vote.user}`, Date.now() + 43200000)
        client.users.fetch(vote.user).then(u => { u.send("Thanks for voting for Qeane!") })
    })
    client.dbl = dbl

    console.log('==SETUP== dbl succesfully loaded!')
}