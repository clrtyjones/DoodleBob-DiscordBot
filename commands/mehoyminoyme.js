/** ------------ MEHOYMINOYME COMMAND ------------ **/

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mehoyminoyme')
		.setDescription('🧽 Doodle Bob VC Annoyance! 🧽'),

	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
  
  /** ------------ MEHOYMINOYME COMMAND ------------ **/