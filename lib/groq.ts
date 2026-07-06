import Groq from 'groq-sdk';

let groq: Groq | null = null;

function getGroq() {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set');
    }
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

export async function getGroqResponse(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
) {
  const completion = await getGroq().chat.completions.create({
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    model: 'qwen/qwen3-32b',
    temperature: 0.7,
    max_tokens: 300,
  });

  let content = completion.choices[0]?.message?.content || "Let's lock in and get back to work.";

  content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  const responseMatch = content.match(/<response>([\s\S]*?)<\/response>/);
  if (responseMatch) {
    content = responseMatch[1].trim();
  }

  return content;
}
