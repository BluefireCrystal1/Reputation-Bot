const { MessageEmbed } = require('discord.js')


module.exports = {
    name: 'meme',
    description: "Send a random meme",
    async execute(message, args, client) {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
        if (args[0]) {
            let data = await fetch(`http://meme-api.herokuapp.com/gimme/${args.toString()}`).then(res => res.json())

            if (data.code == 404) {
                return message.channel.send(`A Subreddit with name ${args[0]} doesn't exist.`)
            }

            if (data.nsfw == true) {
                return;
            } else {

                const embed = new MessageEmbed()
                    .setTitle(data.title)
                    .setURL(data.postLink)
                    .setColor("#00C7FF")
                    .setFooter({ text: data.ups + " Upvotes", iconURL: 'https://i.imgur.com/SCAlsRU.png' })
                    .setImage(data.url)
                    .setAuthor({ name: data.author })

                message.channel.send({ embeds: [embed] })
            }
        } else {
            let data = await fetch("http://meme-api.herokuapp.com/gimme").then(res => res.json())

            if (data.nsfw == true) {
                return;
            } else {

                const embed = new MessageEmbed()
                    .setTitle(data.title)
                    .setURL(data.postLink)
                    .setColor("#00C7FF")
                    .setFooter({ text: data.ups + " Upvotes", iconURL: 'https://i.imgur.com/SCAlsRU.png' })
                    .setImage(data.url)
                    .setAuthor({ name: data.author })

                message.channel.send({ embeds: [embed] })
            }
        }
    }
}