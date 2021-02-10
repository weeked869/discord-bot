const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Json Files/config.json')
const prefix = '.'
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, S\'il te plait, arrete de spam', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** a été kick pour : spam.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** a été ban pour : spam.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});

const fs = require('fs');
client.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    console.log(`${files.length} commands loads !`);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('Commands not found');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.cmd.name, props);
    });
})

fs.readdir("./events/", (err, f) => {
    if (err) console.log(err)
    console.log(`${f.length} events loaded!`);

    f.forEach((f) => {
        const events = require(`./events/${f}`)
        const event = f.split('.')[0];

        client.on(event, events.bind(null, client));
    })
})

//Redirect to discord bot token
client.login(config.token)


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ");

    let commandeFile = client.commands.get(cmd.slice(prefix.length));
    if (commandeFile) commandeFile.run(client, message, args)
});




// Anti Spam 
 
    
client.on('message', (message) => antiSpam.message(message));


//



    
client.on ('message', message  =>  {
    if  (message.content.startsWith(prefix + 'ping'))  {
        message.channel.send( 'Pong.' ) 
    }  else  if  (message.content.startsWith(prefix + 'bip'))  {
        message.channel.send( 'Boop.' ) ;
    }  else if  (message.content.startsWith(prefix + 'server'))  {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    }  else if  (message.content.startsWith(prefix + 'userinfo'))  {
        message.channel.send( `Votre nom d'utilisateur: \`\`\`${message.author.username}\`\`\` \n Votre identifiant: \`\`\`${message.author.id}\`\`\` ` ) ;
    }
} ) 




client.on('message', message => {
    if (message.content.startsWith(prefix + 'help')) {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Voici les commandes :')
        .setDescription(`!ping -> pong \n !bip -> Boop \n !server -> Connaître le nom du serveur \n !userinfo -> Connaître vos informations`)
        message.channel.send(embed)
    }
})


client.on('message', message => {
    if (message.content.startsWith(prefix + 'code')) {
message.channel.send("Voici le code du bot : https://sourceb.in/Rx5rrfsnLH ")
    }
})

client.login(process.env.TOKEN);