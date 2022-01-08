/** ------------ EMBED COMMAND ------------ **/

module.exports = {
    name: 'embed',
    description: "testing out embedded messages",
    
    execute(message, args, Discord) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Rules')
        .setURL('https://www.reddit.com')
        .setDescription('This is a embed for the server')
        .addFields(
          {name: 'Rule 1', value: 'Be Nice', inline: true},
          {name: 'Rule 2', value: 'Say Hi To Chilli Boi', inline: true},
          {name: 'Rule 3', value: 'Eat Some Food', inline: true}
        )
        .setImage('https://preview.redd.it/gyy7keucmgu71.jpg?auto=webp&s=07f0efda157d5c9933ec1b3fbdfcbe5abb83327d')
        .setFooter('🔧 Developed By ClrtyJones#0001')
        .setTimestamp()
  
        message.channel.send({embeds: [newEmbed]});
    }
  }
  
  /** ------------ EMBED COMMAND ------------ **/