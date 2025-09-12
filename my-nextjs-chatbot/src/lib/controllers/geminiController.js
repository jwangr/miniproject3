import GeminiDao from '../dao/geminiDao.js';
import ValidatePrompt from '../utils/ValidatePrompt.js';

const validatePrompt = new ValidatePrompt();

export default class GeminiController {
  async generateContent(prompt, chatHistory) {
    console.log(`Controller received ${prompt} and ${JSON.stringify(chatHistory)}`)
    // Validation error if prompt too long or blank
    validatePrompt.validateText(prompt);

    const dao = new GeminiDao();
    return await dao.callGeminiAPI(prompt, chatHistory);
  }
}