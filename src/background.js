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
  } else if (message.action === 'getDefinition') {
    getDefinitionAI(message.text, message.context)
      .then((result) => {
        sendResponse({ success: true, result });
      })
      .catch((error) => {
        console.error('Error in definition', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Required for async sendResponse
  }
});

// AI analysis function
async function analyzeTextWithAI(text, context) {
  try {
    const prompt = `
      Respond in exactly this format:
      [brief analysis of ${context} under 50 words]
      - Use easy words
      - Analysis should be concise, clear, and easy to understand.
    `;

    const result = await model.generateContent(prompt);
    console.log('AI RESPONSE:', result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
}

async function getDefinitionAI(text, context) {
  try {
    const prompt = `
      Get the definition of ${text} based on the context: ${context}.
      Respond in exactly this format:
      [parts of speech]: [definition]

      - If there are multiple definitions, seperate them by -.
      - Be concise and clear.
      - Parts of speech surrounded by [].
    `;

    const result = await model.generateContent(prompt);
    console.log('AI Definition Response:', result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('AI definition error:', error);
    throw error;
  }
}
/*
TODO: What if there are multiple definitions? -> need to make them a list, <oi>Def1</oi>, <oi>Def2</oi>, ...
      - splitter: '-'
      - use splitter to separate definitions.

TODO: Add Show Analysis button. -> Show analysis (Expand below Definition).
      Separate between Definition and Analysis.
*/
