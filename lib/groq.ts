import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqResponse(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
) {
  const completion = await groq.chat.completions.create({
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
