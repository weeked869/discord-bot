const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
        const author = message.author
        

        const member = message.mentions.user.first()
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        let reason = ''
        if (!args[1]) reason = 'NO'
        else reason = args.slice(1).join(' ')
        if (member.roles.cache.find(r => r.name.toLowerCase() === 'Mute')) return message.reply('L’utilisateur est déjà en sourdine!')
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Je n’ai pas les autorisations de couper l’utilisateur en sourdine! «MANAGE_ROLES»')
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply('L’utilisateur ne pouvait pas être coupé en sourdine!')
        if (!member) return message.reply('S’il vous plaît mentionner un utilisateur!')
        if (!role) {
            const Embed = new Discord.MessageEmbed()
                .setTitle('Erreur de mute')
                .setDescription('Il semble que votre serveur de discord n’a pas actuellement un rôle « mute ». \n\n souhaitez-vous en générer un ?')
                .setColor('RED')
            message.channel.send(Embed).then(async message => {
                await message.react("✅")
                await message.react("❌")

                const filtro = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === author.id
                const collector = message.createReactionCollector(filtro)

                collector.on("collect", async r => {
                    switch (r.emoji.name) {
                        case '✅':
                            if (message.guild.roles.cache.size >= 250) {
                                message.channel.send(' N’a pas réussi à générer un rôle « mute ». Votre serveur a trop de rôles! [250]')
                                collector.stop()
                                break
                            }
                            message.reactions.removeAll()
                            if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
                                message.channel.send('Je n’ai pas les autorisations appropriées pour créer ce rôle! « MANAGE_CHANNELS »')
                                collector.stop()
                                break
                            }
                            const mutedRole = await message.guild.roles.create({
                                data: {
                                    name: 'Mute',
                                    color: 'GRAY'
                                }
                            })
                            message.channel.send('Un rôle « Mute » a été créé!')
                            message.guild.channels.cache.forEach(async (channel, id) => {
                                await channel.createOverwrite(mutedRole, {
                                    READ_MESSAGES: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: false,
                                    ADD_REACTIONS: false,
                                    VIEW_CHANNEL: false,
                                    CONNECT: false,
                                    SPEAK: false
                                })
                            });

                            try {
                                member.roles.add(mutedRole)
                                message.channel.send(`${member} a été mute avec succès pour \`${reason}\`!`)
                                collector.stop()
                            } catch (err) {
                                message.channel.send('Je n’ai pas la permission d’ajouter un rôle à cet utilisateur! `[MANAGE_ROLES]`')
                                collector.stop()
                                break
                            }
                            break;
                        case '❌':
                            message.channel.send('Cancelled.')
                            collector.stop()
                            break;
                    }
                })
            })

        } else {
            try {
                member.roles.add(role)
                message.channel.send(`${member} a été mute avec succès pour \`${reason}\`!`)
            } catch (err) {
                message.reply('Je n’ai pas la permission d’ajouter un rôle à cet utilisateur! `[MANAGE_ROLES]`')
            }
        }
    }
module.exports.cmd = {
   name:'mute'
}