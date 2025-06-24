import Groq from "groq-sdk";
import { envConfig } from "../config";

const groq = new Groq({ apiKey: envConfig.groqApiKey });

const initiateGroq = async (
  prompt: string
): Promise<Groq.Chat.ChatCompletion.Choice> => {
  const chatCompletion = await getGroqChatCompletion(prompt);
  return chatCompletion.choices[0];
};

const getGroqChatCompletion = async (
  prompt: string
): Promise<Groq.Chat.ChatCompletion> => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. And your name is Saim. Response formate content:{title, content} Follow carefully instructions",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
};

export default initiateGroq;
