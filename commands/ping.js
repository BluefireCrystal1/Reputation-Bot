const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Pong!',
    async execute(message, args, client) {
        pingGreen = `Latency is ${Date.now() - message.createdTimestamp}ms. 
                API Latency is ${Math.round(client.ws.ping)}ms`
        pingRed = `Latency is ${Date.now() - message.createdTimestamp}ms. 
                API Latency is ${Math.round(client.ws.ping)}ms`
        

        const embedGreen = new MessageEmbed()
        .setTitle('Pong! 🏓')
        .setDescription(pingGreen)
        .setColor('#A2FF33')

        const embedRed = new MessageEmbed()
        .setTitle('Pong! 🏓')
        .setDescription(pingRed)
        .setColor('#FF4933')

        if(Date.now() - message.createdTimestamp > 50) {
            message.channel.send({embeds: [embedRed]})
        }
        if(Date.now() - message.createdTimestamp < 50) {
            message.channel.send({embeds: [embedGreen]})
        }
    }
}