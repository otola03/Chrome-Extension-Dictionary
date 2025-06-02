# Deploying Your Proxy Server to Vercel

Follow these steps to deploy your proxy server to Vercel:

## Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- Vercel CLI installed (`npm install -g vercel`)

## Deployment Steps

### 1. Login to Vercel
Open a terminal in the proxy-server directory and run:
```
vercel login
```
Follow the prompts to log in to your Vercel account.

### 2. Deploy to Vercel
In the proxy-server directory, run:
```
vercel
```

During the deployment process, Vercel will ask you several questions:
- Set up and deploy? Answer: `y`
- Which scope? Select your account or team
- Link to existing project? Answer: `n` (unless you've deployed this before)
- What's your project name? Enter a name (e.g., `extractword-proxy`)
- In which directory is your code located? Just press Enter (current directory)
- Want to override settings? Answer: `n`

### 3. Set Environment Variables
After deployment, you need to set your API key as an environment variable:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your newly deployed project
3. Go to "Settings" > "Environment Variables"
4. Add a new variable:
   - Name: `API_KEY`
   - Value: Your Google AI API key
5. Click "Save"
6. Redeploy your application for the changes to take effect (you can do this from the "Deployments" tab)

### 4. Update Your Chrome Extension
Once deployed, Vercel will give you a production URL (like `https://your-project-name.vercel.app`).

Update the `PROXY_SERVER_URL` in your `background.js` file:
```javascript
const PROXY_SERVER_URL = 'https://your-project-name.vercel.app';
```

Then rebuild your Chrome extension with webpack.

## Troubleshooting
- If you encounter CORS issues, make sure your Vercel deployment has the proper CORS headers (already configured in your server.js)
- If the API calls fail, check the Vercel logs in the dashboard under "Deployments" > [latest deployment] > "Functions"
