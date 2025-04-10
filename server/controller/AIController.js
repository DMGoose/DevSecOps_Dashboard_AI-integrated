const OpenAI = require("openai");
require('dotenv').config();
const axios = require('axios');

module.exports.getSuggestions = async (req, res, next) => {
    console.log('Key length:', process.env.OPENROUTER_API_KEY?.length);
    console.log('Key preview:', process.env.OPENROUTER_API_KEY?.slice(0, 10) + '...');
    try {

        const { prompt } = req.body;
        console.log('收到前端数据：', prompt);

        const model = process.env.CURRENT_MODEL;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("这是API返回来的response",response);

        res.json({
            suggestion: response.data.choices[0]?.message?.content || '生成失败'
        });
    }
    catch (err) {
        console.error("Error occurred in getSuggestions:", err.response?.data || err.message);
        next(err);
    }
}

