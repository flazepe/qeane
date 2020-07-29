async function cpuUsage(time) {
  let startTime = process.hrtime();
  let startCPU = process.cpuUsage();
  await new Promise(r => setTimeout(r, time));
  let elapsedTime = process.hrtime(startTime);
  let elapsedCPU = process.cpuUsage(startCPU);
  let milliseconds = elapsedTime[0] * 1000 + elapsedTime[1] / 1000000;
  let timings = elapsedCPU.user / 1000 + elapsedCPU.system / 1000;
  let percentage = 100 * timings / milliseconds;
  return percentage;
}

module.exports = {
  name: 'stats',
  category: "info",
  async execute(client, msg) {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    hours %= 24;
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let cpuusage = cpuUsage(2000)
    let desc = `
    Uptime: **${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s**
    Commands: **${client.commands.size}**
    Guilds: **${client.guilds.cache.size}**
    Last bot update: **${client.version}**
    Cores: **${require('os').cpus().length}**
    CPU usage: **${await cpuusage}%**
    RAM Usage: **${Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB'}/${Math.round(require('os').totalmem() / 1000000000) + 'GB'}**
    `


    msg.reply("", {
      embed: {
        title: "Stats:",
        description: desc,
        image: { url: `https://top.gg/api/widget/${client.user.id}.png` },
        color: client.functions.randomColor()
      }
    })


  },
};
