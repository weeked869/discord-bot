const Discord = require('discord.js')

module.exports.run = async ( client, message ) => {
    const args =  message.content.trim().split(/ +/g)
    let question = args.slice(1).join(" ");
      if(!question) {
          return message.channel.send("s’il vous plaît tapez une question complète");
      }
      let replies = ["Oui.","Non.","Je ne sais pas🤔","Demandez à nouveau plus tard, je suis occupé","Eh bien oui, mais en fait non.","Eh bien non, mais en fait oui.","comment devrais-je savoir?","Oui ..., Désolé, je veux dire non."];
      
      let result = Math.floor((Math.random() * replies.length));
      
      
      const emb = new Discord.MessageEmbed()
    .setTitle("Ma réponse est :")
    .setColor('RANDOM')
    .setDescription(`${replies[result]}`)
      
message.channel.send(message.author, emb);
    }

module.exports.cmd = {
    name: '8ball'
}