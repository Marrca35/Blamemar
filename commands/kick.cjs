const { MessageEmbed } = require("discord.js");
const { version } = require("../config.json");

module.exports = {
  name: "kick",
  description: "kicks the specified user from the server",
  args: true,
  usage: "<user> <reason>",
  perms: ["KICK_MEMBERS"],
  async execute(message, args) {
    let reason = "";
    args.forEach((element) => {
      if (args[0] != element) reason += " " + element;
    });
    const member =
      message.mentions.members.first() ||
      message.guild.members.resolve(args[0]);
    if (!member) {
      return await message.channel.send(
        `That user doesn't exist, ${message.author}!`
      );
    } else if (member === message.author) {
      return await message.channel.send(
        `You can't kick yourself, ${message.author}!`
      );
    } else if (!member.kickable) {
      return await message.reply(
        `You can't kick that user, ${message.author}!`
      );
    }
    await member.kick(reason);
    await message.channel.send(
      `${member.user.tag} has been kicked! (user messaged to notify)`
    );
    return await member.createDM(true).then(async (channel) => {
      await channel.send(
        new MessageEmbed()
          .setColor("#0099ff")
          .setAuthor(
            `${message.client.user.username} ${version}`,
            message.client.user.avatarURL()
          )
          .setTitle("You have been kicked!")
          .addFields(
            {
              name: "You were kicked by:",
              value: message.author,
            },
            {
              name: "Reason:",
              value: reason,
            }
          )
          .setTimestamp()
          .setFooter(`${message.client.user.username} ${version}`)
      );
    });
  },
};
