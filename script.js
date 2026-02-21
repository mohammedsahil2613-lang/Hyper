import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ content: "No topic provided." });

    const prompt = `
      You are a premium AI content generator.
      Generate a unique, viral, futuristic, hype content for the topic: "${topic}".
      Structure: Headline, Hook, Body, Call to Action.
      Tone: Premium, futuristic, engaging, hype.
      Never repeat previous content exactly. Make it realistic, useful, and impress the user.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    const content = completion.choices[0].message.content;
    res.status(200).json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ content: "AI generation error!" });
  }
}
