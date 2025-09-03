import GeminiDao from '../dao/geminiDao.js';
import ValidatePrompt from '../utils/validatePrompt.js';

const validatePrompt = new ValidatePrompt();

export default class GeminiController {
  async generateContent(prompt) {
    // Validation error if prompt too long or blank
    validatePrompt.validateText(prompt); 

    const dao = new GeminiDao();
    return await dao.callGeminiAPI(prompt);
  }
}