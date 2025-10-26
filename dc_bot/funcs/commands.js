module.exports = (client, bot) => {

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;
    const [cmd, ...args] = message.content.slice(prefix.length).split(/\s+/);

    
    const sayAliases = ['say', 'speak'];
    if (sayAliases.includes(cmd)) {
      if (!bot) return message.reply("Minecraft bot not established yet.");

      const msg = args.join(' ');
      bot.chat(msg);
      message.reply(`**Sent in Minecraft:** ${msg}`);
    }

    const pingAliases = ['ping'];
    if (pingAliases.includes(cmd)) {
      message.reply('Pong!');
    }

  });

  if (bot) {
    bot.on('chat', (username, message) => {
      if (username === bot.username) return;
      console.log(`<${username}> ${message}`);
    });
  }

};
