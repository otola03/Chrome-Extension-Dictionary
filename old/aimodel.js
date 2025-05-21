import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize AI model (Global SDK object)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Expose AI functionality to window object for content script access
window.ai = {
  async analyzeTextWithAI(text, context) {
    try {
      const prompt = `
        Analyze the selected text and its context:
        Selected Text: "${text}"
        Context: ${context}
        
        Provide a brief analysis of the selected text's definition and importance within the context.
      `;

      const response = await model.generateContent(prompt);
      console.log(response.text);
      return response.text;
    } catch (error) {
      console.error('AI analysis error:', error);
      return 'Error analyzing text';
    }
  },
};

// Initialize AI model when script loads
window.ai
  .analyzeTextWithAI('test', 'test context')
  .then(() => {
    console.log('AI model initialized');
  })
  .catch((error) => {
    console.error('Failed to initialize AI model:', error);
  });
