require('dotenv').config();
const config = require('config');
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const { isSafeTextChannel } = require('bot/funcs/util/channel');


const startTime = performance.now();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.once('ready', async () => {

  const endTime = performance.now();
  const startupTime = (endTime - startTime).toFixed(2);

  const logChannelId = config.get('channels.log');

  try {

    const logChannel = await client.channels.fetch(logChannelId);

    const logMessage = [
      `✅ **Established Connection**`,
      `**Tag:** ${client.user.tag}`,
      `**Startup Time:** ${startupTime} ms`
    ].join('\n');

    if (isSafeTextChannel(logChannel)) {

      await logChannel.send(logMessage);

    } else {

      console.error('⚠️ Log channel is not a valid text-based channel.');

    }

    console.log(logMessage);

  } catch (err) {

    console.error('❌ Failed to fetch or send to the log channel:', err);

  }
});

client.on('messageCreate', message => {
    
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);
