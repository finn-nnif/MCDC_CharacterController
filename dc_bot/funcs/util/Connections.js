const { isTextChannel } = require('./Channel.js');

// disc

async function logConnectionEstablished(client, logChannelId, startTime) {

  const endTime = performance.now();
  const startupTime = (endTime - startTime).toFixed(2);

  try {

    const logChannel = await client.channels.fetch(logChannelId);
    const logMessage = [
      `✅ **Established Connection**`,
      `**Tag:** ${client.user.tag}`,
      `**Startup Time:** ${startupTime} ms`
    ].join('\n');

    if (isTextChannel(logChannel)) await logChannel.send(logMessage);
    console.log(logMessage);

  } catch (err) {
    console.error('Failed to send connection established message:', err);
  }
}

async function logConnectionTerminated(client, logChannelId, startTime) {

  const endTime = performance.now();
  const runtime = ((endTime - startTime) / 1000).toFixed(2);

  try {

    const logChannel = await client.channels.fetch(logChannelId);
    const logMessage = [
      `❌ **Connection Terminated**`,
      `**Tag:** ${client.user?.tag ?? 'Unknown'}`,
      `**Uptime:** ${runtime} seconds`
    ].join('\n');

    if (isTextChannel(logChannel)) await logChannel.send(logMessage);
    console.log(logMessage);
    
  } catch (err) {
    console.error('Failed to send connection terminated message:', err);
  }
}

// mc

async function logMinecraftEstablished(client, logChannelId, startTime) {

  const endTime = performance.now();
  const startupTime = (endTime - startTime).toFixed(2);

  try {

    const logChannel = await client.channels.fetch(logChannelId);
    const logMessage = [
      `✅ **Minecraft Established**`,
      `**Startup Time:** ${startupTime} ms`
    ].join('\n');

    if (isTextChannel(logChannel)) await logChannel.send(logMessage);
    console.log(logMessage);

  } catch (err) {
    console.error('Failed to send minecraft established message:', err);
  }
}

async function logMinecraftTerminated(client, logChannelId, reason, startTime) {

  const endTime = performance.now();
  const startupTime = (endTime - startTime).toFixed(2);

  try {

    const logChannel = await client.channels.fetch(logChannelId);
    const logMessage = [
      `❌ **Minecraft Terminated**`,
      `**Uptime Time:** ${startupTime} seconds`,
      `**Reason:** ${reason}.`
    ].join('\n');

    if (isTextChannel(logChannel)) await logChannel.send(logMessage);
    console.log(logMessage);

  } catch (err) {
    console.error('Failed to send minecraft terminated message:', err);
  }
}

module.exports = { logConnectionEstablished, logConnectionTerminated, logMinecraftEstablished, logMinecraftTerminated };