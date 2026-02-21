import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ content: "No topic provided." });

    const prompt = `
      Generate unique futuristic viral content for: "${topic}".
      Structure: Headline, Hook, Body, Call to Action.
      Tone: premium, hype, engaging.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    res.status(200).json({ content: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ content: "AI generation error!" });
  }
}
