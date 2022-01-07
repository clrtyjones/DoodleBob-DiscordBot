/** ------------ DOODLE BOB DISCORD BOT ------------ **/

// Prerequisites For discord.js API
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.once('ready', () => {
    console.log('\nDoodle Bob Bot Online ...\n');
});

// Prerequisites For Accessing Commands Directory
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Command Prefix
const prefix = '!';

// When Message Prompts ...
client.on('message', message => {
  // Precaution Bot Protection
  if(!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  // Allow Multiple Commands
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // PING Command Call --------------
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);

  // EMBED Command Call -------------
  } else if (command === 'embed') {
    client.commands.get('embed').execute(message, args, Discord);

  // BUTTON Command Call ------------
  } else if (command === 'button') {
    client.commands.get('button').execute(message, args, Discord);
  }
});

// Login Token
client.login('OTI3NzIxNDc2NTM3MzQ0MDIx.YdOV9A.sfOTJQDVQ3Ol3cD9-EYcm7Y_zRY'); // Change Before Pushing**

/** ------------ DOODLE BOB DISCORD BOT ------------ **/