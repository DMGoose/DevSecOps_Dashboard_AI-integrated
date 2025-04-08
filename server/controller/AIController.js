const OpenAI = require("openai");
require('dotenv').config(); 

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

module.exports.getSuggestions = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        console.log('收到前端数据：', prompt);

        const completion = await client.chat.completions.create({
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
            ],
        });
        res.json({
            suggestion: completion.choices[0]?.message?.content || '生成失败'
          });
    }
    catch(err) {
        console.error("Error occurred in getSuggestions:", err);
        next(err);
    }
}

