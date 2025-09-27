const TelegramBot = require('node-telegram-bot-api');

console.log('🚀 Starting Telegram bot...');

// Your bot token from @BotFather
const BOT_TOKEN = '8209733504:AAEWSi7X3Ed_xuL3YUofueg3pQouQaL70qA';

// Your group chat ID (you can get this by adding your bot to the group and sending a message)
const GROUP_CHAT_ID = '-1003059148671';

// Create a bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

console.log('🤖 Bot initialized and ready to send messages...');

// Function to send message to group
async function sendMessage(message) {
  console.log(`Sending message to group ${GROUP_CHAT_ID}: ${message}`);
  try {
    await bot.sendMessage(GROUP_CHAT_ID, message);
    console.log('✅ Message sent successfully!');
  } catch (error) {
    console.error('❌ Error sending message:', error.message);
  }
}

// Example usage
sendMessage('Hello from Node.js Telegram Bot!');