const profileModel = require('../models/vouchesSchema')


module.exports = {
    name: 'delvouch',
    description: 'Deletes someones vouches',
    async execute(message, args, client) {
        if(message.member.permissions.has("ADMINISTRATOR")) {
        amount = args[1]
        if(amount === isNaN()) return message.channel.send('Please Enter a valid number (Or you might\'ve wrote it wrong), correct syntax = \`;delvouch @mention amount\`')
        const member = message.mentions.users.first()
        if(!member) return message.channel.send('Please mention the person of whom you want to delete the vouches of.')
        let profileData = await profileModel.findOne({ userId: member.id })
        if (profileData) {
            await profileData.updateOne({
                $inc: {
                    vouches: -amount,
                }
            })
        if(amount > profileData.vouches) {
            return await profileData.updateOne({
                $inc: {
                    vouches: profileData.vouches,
                }
            })
        }
        message.reply('Done')
        }
    }else {
        message.reply("You do not have permissions")
    }
    }
        
}