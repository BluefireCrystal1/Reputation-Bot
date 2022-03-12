const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'say',
    description: 'Says something for you',
    async execute(message, args, client) {
        const content = message.content.replace("+say", "")
        const embed = new MessageEmbed()
        .setAuthor({ name: message.member.user.username, iconURL: message.author.displayAvatarURL() })
        .setFields(
            { name: "Message", value: content }
        )
        .setColor("#00C7FF")
        .setTimestamp(message.createdTimestamp)
        .setFooter({ text: `Message ID (Deleted): ${message.id}`, iconURL: message.guild.iconURL() })
        message.channel.send({ embeds: [embed] })
        message.delete().catch((console.error))
    }
}