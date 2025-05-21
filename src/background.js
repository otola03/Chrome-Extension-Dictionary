// Background script with ESM imports
import { GoogleGenerativeAI } from '@google/generative-ai';

// API key is injected by webpack from .env file
const API_KEY = process.env.API_KEY;

// Initialize AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'analyzeText') {
    analyzeTextWithAI(message.text, message.context)
      .then((result) => {
        sendResponse({ success: true, result });
      })
      .catch((error) => {
        console.error('Error in text analysis:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Required for async sendResponse
  }
});

// AI analysis function
async function analyzeTextWithAI(text, context) {
  try {
    const prompt = `
      Analyze the selected text and its context:
      Selected Text: "${text}"
      Context: ${context}
      
      Provide a brief analysis of the selected text's definition and importance within the context.
    `;

    const result = await model.generateContent(prompt);
    console.log('AI response:', result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
}
