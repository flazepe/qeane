module.exports = (client) => {

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  app.post('/webhooks/donatebot', function (request, response) {
    response.sendStatus(200);
    var authenticationToken = "someauthtokensmhwtfrudoin";
    if (request.headers.authorization === authenticationToken) {
      var webhook = request.body;
      console.log(webhook)
      if (webhook.product_id !== "f97wr8mz2X") return;
      switch (webhook.status_id) {
        case "completed":
          client.db.set(`premium.${webhook.buyer_id}`, { email: webhook.buyer_email, last_txn_id: webhook.txn_id, status: webhook.status, active: true })
        case "reversed":
        case "refunded":
        case "sub_ended":
          client.db.set(`premium.${webhook.buyer_id}.active`, false)
      }
    } else {
      response.sendStatus(401)
    }
  });

  app.post('/webhooks/gad/thisisthetokenfortheghreofefdvdfvefhr4g5r41ds21vg', () => {
    client.logs.send(`Bot is going to restart, something has been pulled to the github repo`)
    if (client.queue.size > 0) {
      client.queue.forEach(q => {
        q.textChannel.send("Sorry, but i'm gonna restart, so your queue will dissapear ;( Just re-use the play command in some seconds to continue vibing~")
      })
    }
    require('git-auto-deploy').deploy()
  })

  app.listen(3002, function () {
    console.log("Listening on port 3002");
  });

}
