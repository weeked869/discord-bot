const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Vous ne pouvez faire cela').then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          })

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

        if(!args[0]) return message.channel.send('Mentionne une personne').then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          })

        if(!member) return message.channel.send('Cet utilisateur n\'existe pas dans ce serveur').then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          });
        if(!member.bannable) return message.channel.send('Cet utilisateur ne peut pas être banni. C\'est soit parce qu\'ils sont mod / admin, soit que leur rôle le plus élevé est supérieur au mien').then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          });

        if(member.id === message.author.id) return message.channel.send('ups, tu ne peux pas te bannir !').then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          });

        let reason = args.slice(2).join(" ");

        if(!reason) reason = 'Non_spécifié';

        member.ban()

        const banembed = new Discord.MessageEmbed()
        .setTitle('Membre banni')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Personne banni', member)
        .addField('Banni par :', message.author)
        .addField('Raison', reason)
        .setTimestamp()

        message.channel.send(banembed).then(message => {
            setTimeout(() => {
              message.delete()
            }, 10000)
          });


    }
module.exports.cmd = {
    name: 'ban'
}