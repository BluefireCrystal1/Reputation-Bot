const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'Kicks a user',
    async execute(message, args, client) {
        const member = message.mentions.members.first();
        const reasonOfKick = "No reason specified"
        if (args.length > 1) {
            const reasonOfBan = args[1]
        }
        if (message.member.permissions.has("KICK_MEMBERS")) {
            const memberNotFoundErrorEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You didn\'t specify a member")
                .setColor('RED')
            const notKickableErrorEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("I cannot kick that person my role is lower than them / I dont have perms.")
                .setColor('RED')
            if (!member) return message.channel.send({ embeds: [memberNotFoundErrorEmbed] })
            if (!member.kickable) return message.channel.send({ embeds: [notKickableErrorEmbed] })
            const successfulEmbed = new MessageEmbed()
                .setTitle("Successfuly Kicked!")
                .setDescription(`Kicked ${member.user.username}#${member.user.discriminator} for ${reasonOfKick}`)
                .setColor('RED')
            member.kick({ reason: reasonOfKick })
            message.channel.send({ embeds: [successfulEmbed] })
        }else {
            const missingPermsEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You don\'t have enough permissions")
                .setColor('RED')
            message.channel.send({embeds: [missingPermsEmbed]})
        }
    }
}