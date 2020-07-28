module.exports = (client) => {

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhooks/donatebot', function(request, response) {
  response.sendStatus(200);
  var authenticationToken = "ZbG05841!";
  if (request.headers.authorization === authenticationToken) {
    var webhook = request.body;
    console.log(webhook)
    if (webhook.product_id !== "f97wr8mz2X") return;
    switch (webhook.status_id) {
    case "completed" :
      client.db.set(`premium.${webhook.buyer_id}`, {email: webhook.buyer_email, last_txn_id: webhook.txn_id, status: webhook.status, active: true})
    case "reversed":
    case "refunded":
    case "sub_ended":
      client.db.set(`premium.${webhook.buyer_id}.active`,false)
    }
  } else {
      response.sendStatus(401)
  }
});

app.post('/webhooks/dbl', function(req,res) {
    let authToken = "thisIsAToken";
    if (req.headers.authorization !== authToken) return;

    console.log(req,res)
    let data = req.body
    if (data.type === "test") return console.log("Test succesfull!")
    client.db.set(`votes.${data.user}`, Date.now())
    console.log(`${data.user} just voted!`)
})
app.post('/webhooks/gad/qeaneIsTheBestOWOWATSDISLINKILy', () =>{
  require('git-auto-deploy').deploy()
})

app.listen(3002, function() {
  console.log("Listening on port 3002");
});

}
