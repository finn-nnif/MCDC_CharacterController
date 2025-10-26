require('dotenv').config();
const config = require('config');
const { Client, GatewayIntentBits } = require('discord.js');
const { 
  logConnectionEstablished, 
  logConnectionTerminated, 
  logMinecraftEstablished, 
  logMinecraftTerminated 
} = require('./dc_bot/funcs/util/Connections.js');
const mineflayer = require('mineflayer');

const startTime = performance.now();
const logChannelId = config.get('channels.log');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

let bot;
let mcEstablished = false;

async function shutdown({ minecraftReason, dcReason } = {}) {
  try {

    if (client?.user) {
      await logConnectionTerminated(client, logChannelId, startTime);
      client.destroy();
    }

    if (bot && mcEstablished) {
      await logMinecraftTerminated(client, logChannelId, minecraftReason ?? 'Discord bot shutdown', startTime);
      bot.chat("bye chat");
      bot.removeAllListeners();
      bot.end();
    }

    console.log('Shutdown complete. Exiting...');
  } catch (err) {
    console.error('Error during shutdown:', err);
  } finally {
    process.exit(0);
  }
}

client.once('ready', async () => {

  await logConnectionEstablished(client, logChannelId, startTime);

  bot = mineflayer.createBot({
    host: 'localhost',
    port: 65256,
    username: 'billybob'
  });

  bot.once('spawn', async () => {
    mcEstablished = true;
    await logMinecraftEstablished(client, logChannelId, startTime);

    require('./dc_bot/funcs/commands.js')(client, bot);
  });

  bot.once('end', (reason) => shutdown({ minecraftReason: reason }));
});

client.on('shardDisconnect', () => shutdown({ dcReason: 'Discord bot disconnected' }));
process.on('SIGINT', () => shutdown({ dcReason: 'SIGINT received' }));
process.on('SIGTERM', () => shutdown({ dcReason: 'SIGTERM received' }));
client.on('error', (err) => shutdown({ dcReason: `Discord bot error: ${err.message}` }));

client.login(process.env.DISCORD_BOT_TOKEN);