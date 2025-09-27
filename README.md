# Simple Node.js Telegram Bot

A minimal Telegram bot that sends messages to a group.

## Setup

1. Create a new bot with [@BotFather](https://t.me/BotFather) on Telegram
2. Get your bot token from BotFather
3. Add the bot to your Telegram group as an administrator
4. Get the group chat ID (see instructions below)

## Configuration

Edit `index.js` and replace:
- `YOUR_BOT_TOKEN_HERE` with your bot token
- `YOUR_GROUP_CHAT_ID_HERE` with your group chat ID

## Getting Group Chat ID

1. Add your bot to the group
2. Send any message to the group
3. Visit: `https://api.telegram.org/bot<YourBOTToken>/getUpdates`
4. Look for the chat ID in the response (it will be negative for groups)

## Usage

```bash
node index.js
```

The bot will send a "Hello from Node.js Telegram Bot!" message to your group.