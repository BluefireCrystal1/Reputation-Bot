const { Client, Intents, Collection, MessageEmbed, GuildMember, MessageAttachment, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()
const Canvas = require('canvas')
Canvas.registerFont('./Insanibc.ttf', { family: 'customFont' })

const prefix = "+"

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commands = require(`./commands/${file}`);

    client.commands.set(commands.name, commands);
}

client.once('ready', () => {
    mongoose.connect(process.env.mongoURL,
        {
            keepAlive: true
        }).then(console.log("DB connected!!"));
    console.log(`Connected! Logged in as ${client.user}`)
    client.user.setPresence({
        status: 'dnd'
    })
    client.user.setActivity(`https://discord.gg/mctown`, { type: 'WATCHING' });
});
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px "customFont"`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
};

client.on('guildMemberAdd', async member => {
    //----------
    const guild = client.guilds.cache.get('946631049029496852')
    const channel = guild.channels.cache.get('946635558199889950')
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

    await Canvas.loadImage('https://i.imgur.com/QMbcfzR.png').then(async (background) => {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = context.font = applyText(canvas, `${member.user.username}#${member.user.discriminator}`);;
        context.fillStyle = '#ffffff';
        context.fillText(`${member.user.username}#${member.user.discriminator}`, canvas.width / 2.5, canvas.height / 1.8);

        context.font = context.font = applyText(canvas, `#${member.guild.memberCount}`);;
        context.fillStyle = '#ffffff';
        context.fillText(`#${member.guild.memberCount}`, 281, 199);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png' }));
        context.drawImage(avatar, 25, 25, 200, 200);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');
        channel.send({ files: [attachment] })
    })
    //----------
})

client.on('messageCreate', message => {
    if (message.content.startsWith(`<@!${client.user.id}>`)) message.channel.send(`My prefix is \`${prefix}\``)

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args, client)
    }
    if (command === 'vouch') {
        client.commands.get('vouch').execute(message, args, client)
    }
    if (command === 'vouches') {
        client.commands.get('vouches').execute(message, args, client)
    }
    if (command === 'delvouch' || command === 'deletevouch') {
        client.commands.get('delvouch').execute(message, args, client)
    }
    if (command === 'help') {
        client.commands.get('help').execute(message, args, client)
    }
    if (command === 'say') {
        client.commands.get('say').execute(message, args, client)
    }
    if (command === 'meme') {
        client.commands.get('meme').execute(message, args, client)
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    if (interaction.customId.includes("Button")) {
        const modEmbed = new MessageEmbed()
        if (interaction.customId === 'modButton') {
            modEmbed.setTitle("Moderation Commands!")
                .setDescription(``)
                .setColor("#00C7FF")
                .setFooter({ text: `Requested By ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })

            await interaction.reply({ embeds: [modEmbed], ephemeral: true });
        }
        if (interaction.customId === 'funButton') {
            modEmbed.setTitle("Fun Commands!")
                .setDescription(``)
                .setColor("#00C7FF")
                .setFooter({ text: `Requested By ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
            await interaction.reply({ embeds: [modEmbed], ephemeral: true });
        }
        if (interaction.customId === 'utilityButton') {
            modEmbed.setTitle("Utility Commands!")
                .setDescription(`\`+delvouch\` | Deletes someones vouches
                                 \`+vouch\` | Adds vouch
                                 \`+vouches\` | Shows the amount of vouches someone has
                                 \`+ping\` | Bot ping`)
                .setColor("#00C7FF")
                .setFooter({ text: `Requested By ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
            await interaction.reply({ embeds: [modEmbed], ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN)