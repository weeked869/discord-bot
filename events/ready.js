const Discord = require("discord.js")

module.exports = client => {
    console.log("Your bot is online !");
    client.user.setPresence({ activity: { name: 'Dev : Eroz' }, status: 'online' })
}