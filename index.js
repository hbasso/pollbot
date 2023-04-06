require('dotenv').config();
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [    GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessageTyping,
] });

const prefix = '!'; // Change this to your desired prefix

client.on(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on(Events.MessageCreate, message => {
  if (message.content.startsWith(`${prefix}poll`)) {
    const args = message.content.slice(prefix.length).trim().split('|');
    const question = args[0];
    const choices = args.slice(1);
    if (!question || choices.length < 2) {
      message.reply('Usage: !poll What is your favorite color?|Red|Blue|Green...');
    } else {
      const poll = `${question}\n\n${choices.map((choice, index) => `${index + 1}. ${choice}`).join('\n')}`;
      message.channel.send(poll).then(message => {
        choices.forEach((_, index) => {
          message.react(`${index + 1}\uFE0F\u20E3`);
        });
      });
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);