const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Pong!',
    async execute(message, args, client) {
        message.reply("Pinging...").then(msg => {
            msg.edit("Pinging..")
            msg.edit("Pinging.")
            pingGreen = `\`Latency\` | ${Date.now() - message.createdTimestamp}ms. 
                \`API Latency\` 🟢 | ${Math.round(client.ws.ping)}ms`
            pingRed = `\`Latency\` | ${Date.now() - message.createdTimestamp}ms. 
                \`API Latency\` 🔴 | ${Math.round(client.ws.ping)}ms`


            const embedGreen = new MessageEmbed()
                .setTitle('Pong! 🏓')
                .setDescription(pingGreen)
                .setColor('#A2FF33')

            const embedRed = new MessageEmbed()
                .setTitle('Pong! 🏓')
                .setDescription(pingRed)
                .setColor('#FF4933')

            if (Date.now() - message.createdTimestamp > 50) {
                msg.edit({ embeds: [embedRed], content: `<@!${message.author.id}>` })
            }
            if (Date.now() - message.createdTimestamp < 50) {
                msg.edit({ embeds: [embedGreen], content: `<@!${message.author.id}>` })
            }
        })
    }
}