import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize AI model
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function textWithAI(text, context) {
  const prompt = `
    Selected Text: ${text}
    Context: ${context}

    Respond in exactly this format:
    [definition of the text based on the context in dictionary format in numbered list]
    [brief analysis under 50 words]
    
    - Use easy words
    - Definition should be clear and concise in dictionary format
    - Analysis should relate to the provided context and use easy words
    `;

  const result = await model.generateContent(prompt);
  console.log(
    'AI response:\n------------------------------------------------\n',
    result.response.text()
  );
}

textWithAI(
  'antisemitic',
  "An act of antisemitic terrorism in the nation's capital"
);
