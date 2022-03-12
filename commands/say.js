module.exports = {
    name: 'say',
    description: 'Says something for you',
    async execute(message, args, client) {
        message.reply(message.content)
    }
}