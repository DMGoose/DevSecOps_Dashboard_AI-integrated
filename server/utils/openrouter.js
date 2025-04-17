//用来发请求的
const axios = require('axios');

async function getOpenRouterSuggestion(userPrompt) {
  try {
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.CURRENT_MODEL,
        messages: [
            {
                role: 'user',
                content:[
                    {
                        "type": "text",
                        "text": prompt,
                    },
                ]
            },
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    return res.data;
  } catch (err) {
    console.error('[OpenRouter Error]', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getOpenRouterSuggestion };
