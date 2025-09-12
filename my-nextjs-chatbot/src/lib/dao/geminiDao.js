import axios from 'axios';

export default class GeminiDao {
    async callGeminiAPI(prompt, chatHistory) {
        const GEMINI_API_URL = process.env.GEMINI_API_URL;
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        const formattedChatHistory = chatHistory.flat();
        const data =
        {
            contents: [
                ...formattedChatHistory,
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }


        console.log('Sending data via dao now!')
        console.log(JSON.stringify(data))

        const response = await axios.post(
            GEMINI_API_URL,
            data,
            // { contents: [{ parts: [{ text: prompt }] }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_API_KEY
                }
            }
        );
        console.log(response);

        const candidates = response.data.candidates;
        console.log(`DAO sending back ${JSON.stringify(candidates)}`)
        return candidates[0]?.content?.parts[0]?.text || 'No response from Gemini.';
    }
}