import GeminiDao from '../dao/geminiDao.js';

export default class GeminiController {
  async generateContent(prompt) {
    // TODO: validate prompt
    // a. Throw error if prompt is null or blank
    // b. Throw error if length > 1000 chars

    const dao = new GeminiDao();
    return await dao.callGeminiAPI(prompt);
  }
}