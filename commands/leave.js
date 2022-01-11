/** ------------ PING COMMAND ------------ **/

const { SlashCommandBuilder } = require('@discordjs/builders');

const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leaves the VC.'),
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

        // Leave The Voice Channel
        await connection.destroy();
        await interaction.reply('Left the VC! :cry:');
	},
};
  
  /** ------------ PING COMMAND ------------ **/