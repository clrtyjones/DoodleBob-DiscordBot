/** ------------ PLAY COMMAND ------------ **/

const { SlashCommandBuilder } = require('@discordjs/builders');

// Voice Channel Connection Set Up
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

// FFMPEG Connection Set Up
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays your requested music in a VC!')
        .addStringOption(option => option.setName("music").setDescription("the music").setRequired(true)),

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
        
		const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(interaction.options.getString("music"));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            const player = createAudioPlayer();
            const resource = createAudioResource(stream);

            player.play(resource);
            connection.subscribe(player);

            await interaction.reply(`:thumbsup: Now Playing: ***${video.title}***`)
        } else {
            await interaction.reply(`:cry: No Songs Found.`)
        }
	},
};
  
/** ------------ PLAY COMMAND ------------ **/