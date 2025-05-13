const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction
  ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

client.config = config;

const loadCommands = (dir = "./commands/") => {
  fs.readdirSync(dir).forEach(dirContent => {
    const stats = fs.statSync(`${dir}${dirContent}`);
    if (stats.isDirectory()) {
      loadCommands(`${dir}${dirContent}/`);
    } else {
      if (!dirContent.endsWith('.js')) return;
      const command = require(`${dir}${dirContent}`);
      client.commands.set(command.help.name, command);
    }
  });
};

const loadEvents = (dir = "./events/") => {
  fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`${dir}${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
};

loadCommands();
loadEvents();

client.login(config.token).catch(err => {
  console.error("Bot giriş hatası:", err);
});

client.on('messageDelete', message => {
  if (message.author && !message.author.bot) {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      timestamp: Date.now()
    });
  }
});

process.on('unhandledRejection', error => {
  console.error('Yakalanmamış hata:', error);
});
