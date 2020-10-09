const { MessageEmbed } = require("discord.js");
const { version } = require("../config.json");

module.exports = {
  name: "mute",
  description: "mutes the specified user if not muted",
  args: true,
  usage: "<user> <reason>",
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
        `You can't mute yourself, ${message.author}`
      );
    }
    const muted = member.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    if (member.roles.cache.has(muted.id)) {
      return await message.channel.send(
        `That user is already muted, ${message.author}!`
      );
    }
    await member.roles.add(muted);
    await message.channel.send(
      `${member.user.tag} has been muted! (user messaged to notify)`
    );
    return await member.createDM(true).then(async (channel) => {
      await channel.send(
        new MessageEmbed()
          .setColor("#0099ff")
          .setAuthor(
            `${message.client.user.username} ${version}`,
            message.client.user.avatarURL()
          )
          .setTitle("You have been muted!")
          .addFields(
            {
              name: "You were muted by:",
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
