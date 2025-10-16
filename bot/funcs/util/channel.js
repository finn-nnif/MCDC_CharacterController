
function isTextChannel(channel) {
  return (
    channel &&
    typeof channel.send === 'function' && // basic send support
    channel.isTextBased && channel.isTextBased()
  );
}

module.exports = {
  isSafeTextChannel,
};