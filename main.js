// Token/IDs Setup
const dotenv = require('dotenv')
dotenv.config()

/** ------------ DOODLE BOB DISCORD BOT ------------ **/

// Discord API Setup
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_VOICE_STATES,
  ]
});

// Command Handler Setup
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Logging In... Bot Online
client.on('ready', () => {
    console.log('\nDoodle Bob Bot Online ...\n');
});

// Command Handler Async Function, Execute Corresponding Commands
client.on('interactionCreate', async interaction => {
  	// If Not A Command, Ingore
	if (!interaction.isCommand()) return;

  	// Grab Our Current Requested Command
	const command = client.commands.get(interaction.commandName);

  	// If Not A Command, Ignore
	if (!command) return;

  	// Execute Our Command, Throw Error If Not Applicable.
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login Token
client.login(process.env.TOKEN);

/** ------------ DOODLE BOB DISCORD BOT ------------ **/