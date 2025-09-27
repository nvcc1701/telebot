const TelegramBot = require('node-telegram-bot-api');

// Your bot token
const BOT_TOKEN = '8209733504:AAEWSi7X3Ed_xuL3YUofueg3pQouQaL70qA';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 Listening for messages to get chat ID...');
console.log('Send a message to your bot or in a group where the bot is added, then check the terminal.');

bot.on('message', (msg) => {
  console.log('Message received!');
  console.log('Chat ID:', msg.chat.id);
  console.log('Chat type:', msg.chat.type);
  console.log('Chat title:', msg.chat.title || 'N/A');
  console.log('---');
});

bot.on('polling_error', (error) => {
  console.log('Polling error:', error.message);
});

process.on('SIGINT', () => {
  console.log('Stopping...');
  bot.stopPolling();
  process.exit(0);
});