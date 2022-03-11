const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: 'help',
    description: 'Commands in the bot',
    async execute(message, args, client) {
        const embed = new MessageEmbed()
            .setTitle("Commands!")
            .setDescription("Select a category")
            .setColor("#00C7FF")
            .setFooter({ text: `Requested By ${message.member.user.username}`, iconURL: message.author.displayAvatarURL() })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('utilityButton')
                    .setLabel("Utility")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId('funButton')
                    .setLabel("Fun")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId('modButton')
                    .setLabel("Moderation")
                    .setStyle("PRIMARY")
            )

            message.reply({ embeds: [embed], components: [row] })

    }
}