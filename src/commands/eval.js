module.exports = {
  name: 'eval',
  ownerOnly: true,
  category: "owner",
  async execute(client,msg) {
   try {
      const code = msg.args.join(" ");
      let evaled = await require('util').inspect(eval(code));
      evaled.replace(client.token,"woopsie doopsie, toen leaked")
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        if (evaled.includes(client.token)) evaled="token leak detected, FBI OPENS UP"
        if (evaled.length>1024) {
          console.log(evaled)
         return msg.channel.send('Text too long! Sending it to js console...')
        } else {     
      msg.reply("",{embed:{
        color: client.functions.randomColor(),
        descripion: "Eval succeded!",
        fields: [
        {name: 'Input :', value: `\`\`\`js\n${msg.args.join(' ')}\`\`\``},
        {name: 'Output', value: `\`\`\`js\n${evaled}\`\`\``}
      ]
      }})};
    } catch (err) {
      console.log(err)
      msg.reply("",{embed:{
        color: client.functions.randomColor(),
        descripion: "Eval failed!",
        fields: [
        {name: 'Input :', value: `\`\`\`js\n${msg.args.join(' ')}\`\`\``},
        {name: 'Output', value: `\`\`\`js\n${err}\`\`\``}
      ]
      }})};
    
  },
};
