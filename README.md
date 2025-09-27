# Telegram Bot API Service

A Node.js Express API that sends messages to Telegram groups via HTTP requests.

## Features

- ✅ HTTP API endpoints for sending Telegram messages
- ✅ Both GET and POST methods supported
- ✅ Comprehensive error handling and validation
- ✅ Health check endpoint
- ✅ Detailed logging for debugging
- ✅ Can be called from anywhere on the internet

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure bot credentials** in `index.js`:
   ```javascript
   const BOT_TOKEN = 'YOUR_BOT_TOKEN_FROM_BOTFATHER';
   const GROUP_CHAT_ID = 'YOUR_GROUP_ID'; // Note: Supergroups have -100 prefix
   ```

3. **Start the server:**
   ```bash
   node index.js
   ```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status information.

Example response:
```json
{
  "status": "OK",
  "bot": "running",
  "timestamp": "2025-09-27T14:45:40.593Z"
}
```

### Send Message (POST)
```
POST /send-message
```

Request body:
```json
{
  "message": "Your message here"
}
```

Example:
```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from API!"}'
```

### Send Message (GET)
```
GET /send-message?message=your_text_here
```

Example:
```bash
curl "http://localhost:3000/send-message?message=Hello%20World"
```

## Internet Usage

To call this API over the internet:

### Method 1: Local Network (Simplest)

If running on your local machine:

1. **Find your local IP:** (`ip route get 8.8.8.8 | awk 'NR==1 {print $7}'`)
2. **Access via:** `http://YOUR_LOCAL_IP:3000`
3. **Make sure firewall allows port 3000**

Note: Anyone on your local network can access this.

### Method 2: Deploy to Cloud Service

Deploy to platforms like:
- **Heroku**: Free tier available
- **Railway**: Generous free tier
- **Vercel**: Free for static sites but can work with serverless functions
- **DigitalOcean**: VPS hosting
- **AWS/GCP/Azure**: Cloud platforms

### Method 3: Use ngrok (for Testing)

Install ngrok:
```bash
npm install -g ngrok
```

Start ngrok on port 3000:
```bash
ngrok http 3000
```

This gives you a public HTTPS URL like: `https://xxxxx.ngrok.io`

## Usage Examples

### JavaScript/Node.js
```javascript
const response = await fetch('http://YOUR_HOST:3000/send-message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Alert: Server is down!'
  })
});

const result = await response.json();
console.log(result); // {"success": true, "message": "Message sent successfully"}
```

### Python
```python
import requests

response = requests.post('http://YOUR_HOST:3000/send-message',
    json={'message': 'Hello from Python!'})
result = response.json()
print(result)
```

### cURL
```bash
# POST method
curl -X POST http://YOUR_HOST:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from cURL!"}'

# GET method
curl "http://YOUR_HOST:3000/send-message?message=Hello%20from%20GET%20request"
```

### Web Browser
Directly visit: `http://YOUR_HOST:3000/send-message?message=Hello%20from%20browser`

## Integration Ideas

- **Monitoring alerts**: Server sends automated notifications
- **Notifications**: Business logic triggers Telegram messages
- **Webhooks**: External services POST to your endpoint
- **IoT projects**: Devices send messages when events occur
- **GitHub Actions**: CI/CD pipelines notify deployment status

## Security Notes

- Default setup has no authentication
- For production use, consider adding:
  - API key authentication
  - Rate limiting
  - Input validation/sanitization
  - HTTPS (when deploying to cloud)

## Error Handling

The API returns detailed error responses:
```json
{
  "success": false,
  "error": "Missing message parameter"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (missing parameters)
- `500`: Server error (Telegram API issues)

## Troubleshooting

**Common Issues:**

1. **"chat not found"**: Check your `GROUP_CHAT_ID` - supergroups have `-100` prefix
2. **"not authorized"**: Verify your bot token is correct
3. **"bot is not a member"**: Add the bot to your group as an administrator
4. **Connection refused**: Ensure the server is running and accessible

**Logs:**
Check the console output for detailed error information and message sending status.