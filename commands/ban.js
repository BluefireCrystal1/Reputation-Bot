const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Bans a user',
    async execute(message, args, client) {
        const member = message.mentions.members.first();
        const reasonOfBan = "No reason specified"
        if (args.length > 1) {
            const reasonOfBan = args[1]
        }
        if (message.member.permissions.has("BAN_MEMBERS")) {
            const memberNotFoundErrorEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You didn\'t specify a member or the member is already banned")
                .setColor('RED')
            const notBannableErrorEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("I cannot ban that person")
                .setColor('RED')
            if (!member) return message.channel.send({ embeds: [memberNotFoundErrorEmbed] })
            if (!member.bannable) return message.channel.send({ embeds: [notBannableErrorEmbed] })
            const successfulEmbed = new MessageEmbed()
                .setTitle("Successfuly Banned!")
                .setDescription(`Banned ${member.user.username}#${member.user.discriminator} for ${reasonOfBan}`)
                .setColor('RED')
            member.ban({ reason: reasonOfBan })
            message.channel.send({ embeds: [successfulEmbed] })
        }else {
            const missingPermsEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You don\'t have enough permissions")
                .setColor('RED')
            message.channel.send({embeds: [missingPermsEmbed]})
        } try {

        }catch(err) {
    
        }
    }
}