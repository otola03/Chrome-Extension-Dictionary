// Background script with type: module
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Use environment variable or store API key securely
// In production, you should use more secure ways to handle API keys
const API_KEY = process.env.API_KEY;

// Initialize AI model
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

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

    const response = await model.generateContent(prompt);
    console.log('AI response:', response.text);
    return response.text;
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
}
