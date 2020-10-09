const { MessageEmbed } = require("discord.js");
const { prefix, version } = require("../config.json");

module.exports = {
  name: "help",
  description: "prints this help",
  args: false,
  async execute(message, args) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        `${message.client.user.username} ${version}`,
        message.client.user.avatarURL()
      )
      .setTitle("Help");
    message.client.commands.forEach((command) => {
      if (command.usage) {
        embed.addField(
          `\`${prefix}${command.name} ${command.usage}\``,
          command.description
        );
      } else {
        embed.addField(`\`${prefix}${command.name}\``, command.description);
      }
    });
    return await message.channel.send(
      embed
        .setTimestamp()
        .setFooter(`${message.client.user.username} ${version}`)
    );
  },
};
