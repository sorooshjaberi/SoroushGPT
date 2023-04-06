import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi, Configuration, CreateChatCompletionResponse } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateChatCompletionResponse>
) {
  if (req.method === "POST") {
    const chatHistory = JSON.parse(req.body);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      max_tokens: 250,
    });
    res.status(200).json(response.data);
  }
}
