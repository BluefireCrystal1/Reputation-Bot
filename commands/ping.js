module.exports = {
    name: 'ping',
    description: 'Pong!',
    async execute(message, args, client) {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}