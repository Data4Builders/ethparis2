
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const tagText = req.body.tag;
  const title = req.body.title;

  console.log(tagText)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "If the tag '" + tagText + "' is extremely relevant to the news story " + title + " reply with '" + tagText + "' else reply 'false'"
          }
        ],
        max_tokens: 30,
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
    return res.status(200).json({tags});

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}