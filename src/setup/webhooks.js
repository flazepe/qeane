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
    client.logs.send(`Something has been pulled to the github repo`)
    require('child_process').exec('git pull origin master')
  })

  app.listen(3002, function () {
    console.log("Listening on port 3002");
  });

}
