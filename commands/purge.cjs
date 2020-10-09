module.exports = {
  name: "purge",
  description: "purges/deletes the specified amount of messages",
  args: true,
  usage: "<amount>",
  async execute(message, args) {
    const amount = args[0];
    if (!amount) {
      await message.channel.send(
        `You haven't specified an ammount of messages to delete, ${message.author}!`
      );
      return;
    } else if (isNaN(amount)) {
      await message.channel.send(
        `The amount of messages to delete must be a number, ${message.author}!`
      );
      return;
    } else if (amount > 100) {
      await message.channel.send(
        `You can't delete more than 100 messages at a time, ${message.author}!`
      );
      return;
    } else if (amount < 1) {
      await message.channel.send(
        `You must delete at least one message, ${message.author}!`
      );
      return;
    }
    return await message.channel.bulkDelete(amount).catch(() => {
      return;
    });
  },
};
