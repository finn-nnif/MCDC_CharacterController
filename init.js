
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const startTime = performance.now();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.once('ready', () => {
    const endTime = performance.now();
    const startupTime = (endTime - startTime).toFixed(2);
    console.log(`✅ Established Connection`);
    console.log(`Tag: ${client.user.tag}`);
    console.log(`Startup Time: ${startupTime} ms`);
});

client.on('messageCreate', message => {
    
});

// Login the bot
client.login(process.env.DISCORD_TOKEN);
