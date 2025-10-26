require('dotenv').config();
const config = require('config');
const { Client, GatewayIntentBits } = require('discord.js');
const { logConnectionEstablished, logConnectionTerminated } = require('./bot/funcs/util/Connections.js');

const startTime = performance.now();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

const logChannelId = config.get('channels.log');

client.once('ready', async () => {
  await logConnectionEstablished(client, logChannelId, startTime);
});

process.on('SIGINT', async () => {
  await logConnectionTerminated(client, logChannelId, startTime);
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await logConnectionTerminated(client, logChannelId, startTime);
  process.exit(0);
});

client.login(process.env.DISCORD_BOT_TOKEN);