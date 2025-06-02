# ExtractWord Proxy Server

This proxy server securely handles API requests for the ExtractWord Chrome Extension, keeping your API keys safe and out of the client-side code.

## Why a Proxy Server?

When building Chrome extensions, API keys included in the extension code can be exposed in the compiled files, even when using environment variables with tools like dotenv. This proxy server approach solves this security issue by:

1. Keeping API keys on the server side only
2. Providing a secure intermediary between your extension and external APIs
3. Preventing API key exposure in your distributed extension

## Setup Instructions

### 1. Install Dependencies

```bash
cd proxy-server
npm install
```

### 2. Create Environment Variables

Create a `.env` file in the proxy-server directory with your API key:

```
API_KEY=your_google_ai_api_key_here
PORT=3000
```

### 3. Start the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Deployment

For production use, deploy this server to a hosting service like:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS

After deployment, update the `PROXY_SERVER_URL` in your extension's `background.js` file to point to your deployed server URL.

## API Endpoints

The proxy server exposes these endpoints:

- `GET /health` - Health check endpoint
- `POST /api/analyze` - Text analysis endpoint
- `POST /api/definition` - Word definition endpoint

## Security Considerations

- Keep your `.env` file in `.gitignore` to prevent accidental commits
- Use HTTPS in production
- Consider adding rate limiting for production use
- Add authentication if needed for additional security
