const { Client, Intents, Collection, MessageEmbed, GuildMember, MessageAttachment, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()

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
});

client.on('messageCreate', message => {
    if (message.content.startsWith(`<@!${client.user.id}>`)) message.channel.send(`My prefix is \`${prefix}\``)

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === 'ping') {
        client.commands.get('ping').execute(message, args, client)
    }
    if(command === 'vouch') {
        client.commands.get('vouch').execute(message, args, client)
    }
    if(command === 'vouches') {
        client.commands.get('vouches').execute(message, args, client)
    }
    if(command === 'delvouch' || command === 'deletevouch') {
        client.commands.get('delvouch').execute(message, args, client)
    }
});

client.login(process.env.TOKEN)