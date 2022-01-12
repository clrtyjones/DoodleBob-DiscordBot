/** ------------ MEHOYMINOYME COMMAND ------------ **/

const { SlashCommandBuilder } = require('@discordjs/builders');

// Voice Channel Connection Set Up
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mehoyminoyme')
		.setDescription('🧽 Doodle Bob VC Annoyance! 🧽'),

	async execute(interaction) {
		
		// Command Not Available If User Is Not In VC
		const voiceChannel = interaction.member.voice.channel;
		if(!voiceChannel) return interaction.reply('You must be in a Voice Channel to use this command!');

		// Join The Voice Connection
        const connection = joinVoiceChannel ({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator
        })

		// Confirm User Bot Has Connected
		//interaction.reply('🧽 Connected ...');

		// Create Our Audio Resource For Standby
		const player = createAudioPlayer();
		const resourse = createAudioResource('./audio/mehoy.mp3');

		// On User Playing Voice State, Activate Bot Audio
		connection.on('voiceStateUpdate', async (oldState, newState) => {
			if (oldState.speaking !== newState.speaking) {
				console.log('we here');
				player.play(resourse);
				connection.subscribe(player);
			}
		});

		await interaction.reply('idk');
	},
};
  
  /** ------------ MEHOYMINOYME COMMAND ------------ **/