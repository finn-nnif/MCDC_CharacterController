const config = require('config');
const { isTextChannel } = require('./util/Channel.js');

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

    const { capture } = require('prismarine-viewer/capture');

    const viewAliases = ['view', 'see', 'img'];
        if (viewAliases.includes(cmd)) {
        if (!bot) return message.reply("Minecraft bot not established yet.");
        if (!bot.viewer) return message.reply("Viewer not initialized yet.");

        capture(bot.viewer, { width: 600, height: 600 })
            .then((buffer) => {
                message.reply({
                    files: [{ attachment: buffer, name: 'mc_snapshot.png' }]
            });
            })
            .catch((err) => {
                console.error(err);
                message.reply("Failed to capture Minecraft view.");
            });
    }

  });

  if (bot) {
    (async () => {
      const mc_chatID = config.get('channels.mc-chat');
      const logChannel = await client.channels.fetch(mc_chatID);

      bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (!isTextChannel(logChannel)) return;

        logChannel.send(`<${username}> ${message}`);
      });
    })();
  }

};