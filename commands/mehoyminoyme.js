/** ------------ PING COMMAND ------------ **/

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mehoyminoyme')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
  
  /** ------------ PING COMMAND ------------ **/