const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

//help

bot.on('message', message => {
    if (message.content === ',music') {
      // Remove the "var" line; it isn't necessary.
      let help = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('MUSIC')
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic : true}))
        .setURL('https://youtu.be/LNuwgbxQe-M')
        .setDescription('the commands:')
        .setThumbnail('https://i.imgur.com/BKbaUza.png')
        .addFields(
           {name: '__MUSIC__', value: '``play/pp <song>``\n``skip/s``\n``stop``'},
        )
        .setFooter('always use the prefix (,) before every command', 'https://i.imgur.com/fAsCAR1.gif');
         message.channel.send(message.author, help)
    }
});

bot.login(process.env.token);