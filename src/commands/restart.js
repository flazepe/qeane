
let exec = require("child_process").exec

module.exports = {
  name: "restart",
  ownerOnly: true,
  category: "owner",
  async execute(client, msg) {
    msg.reply(client.languages.get(msg.guild.language).commands.restart.restarting).then(() => {
      exec('pm2 restart Qeane', function () {
        return;
      });
    });
  },
};
