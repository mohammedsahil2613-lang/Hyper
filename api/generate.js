import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic required" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a futuristic viral content generator." },
        { role: "user", content: `Create a premium 2050-style post about: ${topic}` }
      ],
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    res.status(200).json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate content" });
  }
}
