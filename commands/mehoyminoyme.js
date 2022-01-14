/** ------------ MEHOYMINOYME COMMAND ------------ **/

// New Command
const { SlashCommandBuilder } = require('@discordjs/builders');

// Voice Channel Connection Set Up
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceReceiver } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mehoyminoyme')
		.setDescription('🧽 Doodle Bob VC Annoyance! 🧽'),

	async execute(interaction) {
		
		// If User Not In Voice Channel, Return
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel) return interaction.reply('You must be in a Voice Channel to use this command!');

		// Join The Voice Connection
        const connection = joinVoiceChannel ({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator
        })

		// Audio Resource Setup For Standby
		const player = createAudioPlayer();
		const resource = createAudioResource('./audio/mehoy.mp3');

		// When A User Speaks In VC, Audio Will Speak Over Them
		const test = new VoiceReceiver(connection);
		const map = test.speaking;
		
		map.on('start', () => {
			console.log('user spoke');
		});

		if (map.users != 0) {
			console.log(map.users);
		}
	},
};
  
/** ------------ MEHOYMINOYME COMMAND ------------ **/