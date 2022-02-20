const { MessageEmbed } = require('discord.js')
const profileModel = require('../models/vouchesSchema')
module.exports = {
    name: 'vouch',
    description: 'Increase someones reputation',
    async execute(message, args, client) {

        const member = await message.mentions.users.first()
        if (!member) return message.channel.send('Please specify a member to vouch for');
        if (member === message.author) return message.channel.send('You cannot vouch for yourself');
        let profileData = await profileModel.findOne({ userId: member.id })
        if (profileData) {
            await profileData.updateOne({
                $inc: {
                    vouches: 1,
                }
            })
            await profileData.save()
            profileData = await profileModel.findOne({ userId: member.id })

            const e = new MessageEmbed()
                .setTitle('Vouch Added!')
                .setDescription(`Vouch Done! ${member.username} Now has ${profileData.vouches} Vouches!`)
                .addFields(
                    { name: 'Vouched for:', value: `${member.username}` }
                )
                .setColor('DARK_VIVID_PINK')
                .setFooter({ text: `Vouched by ${message.author.username}` })
                .setTimestamp()
            message.reply({ embeds: [e] })
        } else {
            await profileModel.create({
                userId: member.id,
                vouches: 1,
                discriminator: member.discriminator,
                username: member.username
            })
            const e = new MessageEmbed()
                .setTitle('Vouch Added!')
                .setDescription(`Vouch Done! ${member.username} Now has ${profileData.vouches-1} Vouches!`)
                .addFields(
                    { name: 'Vouched for:', value: `${member.username}` }
                )
                .setColor('DARK_VIVID_PINK')
                .setFooter({ text: `Vouched by ${message.author.username}` })
                .setTimestamp()
            message.reply({ embeds: [e] })

        }
    }
}

