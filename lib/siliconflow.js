const axios = require('axios');

const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY;
const API_ENDPOINT = 'https://api.siliconflow.com/v1/chat/completions';

async function generateWithPrompt(prompt, max_tokens = 1000) {
  try {
    const response = await axios.post(API_ENDPOINT, {
      model: "your-preferred-model", // 替换为实际模型
      messages: [{ role: "user", content: prompt }],
      max_tokens: max_tokens,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling SiliconFlow API:', error);
    throw error;
  }
}

module.exports = { generateWithPrompt };