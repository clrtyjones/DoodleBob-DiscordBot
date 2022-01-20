/** ------------ TROLL COMMAND ------------ **/

// New Command
const { SlashCommandBuilder } = require('@discordjs/builders');

// Voice Channel Connection Set Up
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('troll')
		.setDescription('Troll a user by having the bot speak over them!')
		.addUserOption(option => option.setName("user").setDescription("The user to troll!").setRequired(true)),

	async execute(interaction) {

		// Initialize Our Victim
		const victim = interaction.options.getUser("user");

		// If User Selected Bot, Prompt Error Msg.
		if (victim.bot) {
			const botErrEmbed = new MessageEmbed ()
			.setColor("RED")
			.setTitle(`🧽 Sorry, can\'t target bot: ***${victim.username}***`)
			.setDescription('Please try again!')
			.setThumbnail(victim.avatarURL())

			return interaction.reply({ embeds: [botErrEmbed] });
		}
		
		// If Selected Victim Is Not In Voice Channel, Prompt Stalker Msg.
        const voiceChannel = victim.client.voice.channel;
        if(!voiceChannel) {
			const stalkEmbed = new MessageEmbed ()
			.setColor("YELLOW")
			.setTitle(`🧽 Victim: ***${victim.username}*** ...`)
			.setDescription('*Will join VC when they do!*')
			.setThumbnail(victim.avatarURL())

			return interaction.reply({ embeds: [stalkEmbed] });
		}

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