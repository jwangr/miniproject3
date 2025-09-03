import axios from 'axios';

export default class GeminiDao {
    async callGeminiAPI(prompt) {
        const GEMINI_API_URL = process.env.GEMINI_API_URL;
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const response = await axios.post(
            GEMINI_API_URL,
            { contents: [{ parts: [{ text: prompt }] }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        const candidates = response.data.candidates;
        return candidates[0]?.content?.parts[0]?.text || 'No response from Gemini.';
    }
}