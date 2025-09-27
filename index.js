const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8686;

// Your bot token from @BotFather
const BOT_TOKEN = '8209733504:AAEWSi7X3Ed_xuL3YUofueg3pQouQaL70qA';

// Your group chat ID
const GROUP_CHAT_ID = '-1003059148671';

// Create a bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('🚀 Starting Telegram Bot API server...');
console.log('🤖 Bot initialized and ready to receive requests...');

// Function to send message to group
async function sendMessage(message) {
  console.log(`📤 Sending message to group ${GROUP_CHAT_ID}: ${message}`);
  try {
    await bot.sendMessage(GROUP_CHAT_ID, message);
    console.log('✅ Message sent successfully!');
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('❌ Error sending message:', error.message);
    return { success: false, error: error.message };
  }
}

// API Routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', bot: 'running', timestamp: new Date().toISOString() });
});

// Endpoint to send message via GET (for simple use cases)
app.get('/send-message', async (req, res) => {
  const message = req.query.message || req.query.text;

  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Missing message parameter. Use ?message=your_text_here'
    });
  }

  const result = await sendMessage(message);
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// Endpoint to send message via POST (recommended)
app.post('/send-message', async (req, res) => {
  const message = req.body.message || req.body.text;

  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Missing message in request body. Use {"message": "your text here"}'
    });
  }

  const result = await sendMessage(message);
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    service: 'Telegram Bot API',
    endpoints: {
      'GET /health': 'Health check',
      'GET /send-message?message=your_text': 'Send message via GET',
      'POST /send-message': 'Send message via POST with {"message": "your_text"}'
    },
    usage: 'Replace YOUR_IP_OR_DOMAIN with your server address',
    example: 'curl http://YOUR_IP_OR_DOMAIN:3000/send-message?message=Hello%20World'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ API Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down server...');
  process.exit(0);
});