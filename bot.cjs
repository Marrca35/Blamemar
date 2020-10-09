const { readdirSync } = require("fs");
const { Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Client();
client.commands = new Collection();

const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".cjs")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", async (member) => {
  setTimeout(async () => {
    await member.roles.add(
      member.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === "member"
      )
    );
  }, 600000);
});

client.on("message", async (message) => {
  if (
    message.channel.type === "dm" ||
    message.channel.type === "news" ||
    message.author.bot ||
    !message.content.startsWith(prefix)
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // if (message.member.roles.cache.some([ 'Moderator', 'Admin', 'Super-Admin', 'Infra-Admin' ]))

  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName);
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return await message.channel.send(reply);
    }
    return await client.commands.get(commandName).execute(message, args);
  }
  return await message.channel.send(
    `The command '${commandName}' doesn't exist, ${message.author}!`
  );
});

client.login(token);
