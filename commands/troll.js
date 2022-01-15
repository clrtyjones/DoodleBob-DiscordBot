/** ------------ TROLL COMMAND ------------ **/

// New Command
const { SlashCommandBuilder } = require('@discordjs/builders');

// Voice Channel Connection Set Up
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('troll')
		.setDescription('Troll a user by having the bot speak over them!')
		.addUserOption(option => option.setName("user").setDescription("The user to troll").setRequired(true)),

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
		resource.volume = 4;

		// Start Our Audio For Standby
		player.play(resource);
		connection.subscribe(player);
		player.pause();

		// When A User Speaks In VC, Audio Will Speak Over Them
		connection.receiver.speaking.on('start', userId => {
			console.log(`${interaction.user.username} started talking`)
			player.unpause();
		});

		connection.receiver.speaking.on('end', userId => {
			player.pause();
		});

		// Loop The Audio If Ended
		player.on(AudioPlayerStatus.Idle, () => {
			player.play(createAudioResource('./audio/mehoy.mp3'));
			player.pause()
		}) 
	},
};
  
/** ------------ TROLL COMMAND ------------ **/