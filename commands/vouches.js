const profileModel = require('../models/vouchesSchema')
const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas')
Canvas.registerFont('./Insanibc.ttf', { family: 'customFont' })

module.exports = {
    name: 'vouches',
    description: 'Count of vouches',
    async execute(message, args, client) {
        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');
            let fontSize = 70;
        
            do {
                context.font = `${fontSize -= 10}px "customFont"`;
            } while (context.measureText(text).width > canvas.width - 300);
        
            return context.font;
        };
        const member = await message.mentions.users.first()
        if (!member) {
            message.channel.send('Mention someone to get their vouches')
        }
        let profileData = await profileModel.findOne({ userId: member.id })
        //----------
        if(profileData) {
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        await Canvas.loadImage('https://i.imgur.com/QMbcfzR.png').then(async (background) => {
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.font = context.font = applyText(canvas, `${member.username}#${member.discriminator}`);;
            context.fillStyle = '#ffffff';
            context.fillText(`${member.username}#${member.discriminator}`, canvas.width / 2.5, canvas.height / 1.8);

            context.font = context.font = applyText(canvas, `Vouches: ${profileData.vouches}`);;
            context.fillStyle = '#ffffff';
            context.fillText(`Vouches: ${profileData.vouches}`, 281, 199);

            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();

            const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png' }));
            context.drawImage(avatar, 25, 25, 200, 200);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');
            message.channel.send({files: [attachment]})
        })
    }
    //----------
}
}