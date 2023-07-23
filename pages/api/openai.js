
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const tagText = req.body;
  if (!tagText) {
    return res.status(400).json({ error: 'Missing text in request body' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate a JavaScript array of 7 unique user tags in the format ['art collector', 'defi enthusiast', 'hackathon winner'], tags based on data about a user. Make them one to two words and as hyper-specific as possible (type of tech used, builder, investor, long-term, newbie, art collector, nyc events, etc). User Data:" + tagText
          }
        ],
        max_tokens: 75,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAIKEY}`,
        },
      }
    );

    console.log(response.data.choices[0].message.content)

    //const tags = response.data.choices[0]; 
    let tags = response.data.choices[0].message.content;
    return res.status(200).json({ tags });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}