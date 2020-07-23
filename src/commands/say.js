module.exports = {
    name: 'say',
    category: "utility",
    async execute(_client,msg) {
        if (!msg.args.join(' ')) {
            let msg = await msg.channel.send('Please provide something to say. This command will be cancelled in 30 seconds.')
            
            let response;
            try {
              response = await msg.channel.awaitmsgs(msg => msg.author.id == msg.author.id && msg.content, {
                max: 1,
                time: 30000,
                errors: ['time']
              });
            } catch(e) {
          msg.delete()
          return msg.channel.send('Time out!').then(m => {setTimeout(() => {m.delete()}, 15000)})
      }
      msg.delete().then(
          msg.channel.send(response.first().content)
      )
        }
        msg.delete().then(
        msg.channel.send(msg.args.join(' ')))
    },
   } 