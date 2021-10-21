require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX ='$';

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});
client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermissions('KICK_MEMBERS')) 
            return message.reply('You do not have permissions to use that command');
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send("I can't kick that user :("));
            } else {
                message.channel.send('That member was not found');
            }
            
        } 
    }
    /*console.log(`[${message.author.tag}] : ${message.content}`);
    if (message.content === 'Hello') {
        message.channel.send('Hello');
    }*/
})
client.login(process.env.DISCORDJS_BOT_TOKEN);

