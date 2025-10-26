const { isTextChannel } = require('./Channel.js');

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

module.exports = { logConnectionEstablished, logConnectionTerminated };