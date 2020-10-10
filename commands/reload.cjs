module.exports = {
  name: "reload",
  description: "reloads the specified command if it exists",
  args: false,
  usage: "[command]",
  perms: ["ADMINISTRATOR"],
  async execute(message, args) {
    if (args.length) {
      const commandName = args[0].toLowerCase();
      const old = message.client.commands.get(commandName);
      if (!old) {
        return await message.channel.send(
          `There is no command with the name \`${commandName}\`, ${message.author}`
        );
      }
      delete require.cache[require.resolve(`./${old.name}.cjs`)];

      try {
        const new_c = require(`./${old.name}.cjs`);
        await message.client.commands.set(new_c.name, new_c);
      } catch (error) {
        console.log(error);
        return await message.channel.send(
          `An error occurred whilst attemping to reload command \`${old.name}\`!`
        );
      }
      return await message.channel.send(
        `The command \`${old.name}\` has successfully been reloaded!`
      );
    } else {
      const old = message.client.commands;
      let current;
      old.forEach(async (element) => {
        current = element;
        delete require.cache[require.resolve(`./${current.name}.cjs`)];
        try {
          const new_c = require(`./${current.name}.cjs`);
          await message.client.commands.set(new_c.name, new_c);
        } catch (error) {
          console.log(error);
          return await message.channel.send(
            `An error occurred whilst attemping to reload command \`${current.name}\`!`
          );
        }
      });
      return await message.channel.send(
        "All command(s) have been successfully reloaded!"
      );
    }
  },
};
