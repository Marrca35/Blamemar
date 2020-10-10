const { MessageEmbed } = require("discord.js");
const { version } = require("../config.json");

module.exports = {
  name: "ban",
  description: "bans the specified user",
  args: true,
  usage: "<user> <reason>",
  perms: ["BAN_MEMBERS"],
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
        `You can't ban yourself, ${message.author}!`
      );
    } else if (!member.bannable) {
      return await message.channel.send(
        `You can't ban that user, ${message.author}!`
      );
    }
    await member.ban(reason);
    await message.channel.send(
      `${member.user.tag} has been banned! (user messaged to notify)`
    );
    return await member.createDM(true).then(async (channel) => {
      await channel.send(
        new MessageEmbed()
          .setColor("#0099ff")
          .setAuthor(
            `${message.client.user.username} ${version}`,
            message.client.user.avatarURL()
          )
          .setTitle("You have been banned!")
          .addFields(
            {
              name: "You were banned by:",
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
