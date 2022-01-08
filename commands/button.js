/** ------------ BUTTON COMMAND ------------ **/

module.exports = {
    name: 'button',
    description: "testing out buttons",
    
    execute(message, args, Discord) {
      const newButton = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel('You Can Trust Me ;)')
            .setStyle('LINK')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        );
  
      message.channel.send({content: 'Click It ...', components: [newButton] });
    }
  }
  
  /** ------------ BUTTON COMMAND ------------ **/