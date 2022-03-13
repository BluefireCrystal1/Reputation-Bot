const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unban',
    description: 'Unbans a user',
    async execute(message, args, client) {
        const idOfMember = args[0]
        const member = await client.users.cache.find(user => user.id === idOfMember)
        if (message.member.permissions.has("BAN_MEMBERS")) {
            const memberNotFoundErrorEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You didn\'t specify a member")
                .setColor('RED')
            const notIdError = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("Please enter the id of the person who you want to unban")
                .setColor('RED')
            if (!member) return message.channel.send({ embeds: [memberNotFoundErrorEmbed] })
            if (args[1] === isNaN()) return message.channel.send({ embeds: [notIdError] })
            const successfulEmbed = new MessageEmbed()
                .setTitle("Successfuly Unanned!")
                .setDescription(`Unbanned`)
                .setColor('RED')
            await interaction.guild.bans.remove(member).catch((err))
            message.channel.send({ embeds: [successfulEmbed] })
        } else {
            const missingPermsEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You don\'t have enough permissions")
                .setColor('RED')
            message.channel.send({ embeds: [missingPermsEmbed] })
        } try {

        } catch (err) {

        }
    }
}