import { log } from "console";
import { chatHistory } from "models/types";
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
    const chatHistory: chatHistory = JSON.parse(req.body);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      max_tokens: 250,
    });
    log(response);
    res.status(200).json(response.data);
  } else {
    // const models = (await openai.listModels()).data  ;
    // res.status(200).json(models);

    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "hey",
          },
        ],
        max_tokens: 500,
      })
      .then((response) => {
        // res.status(200).json(response.data.choices);
      });
    // log(response?.data?.choices);
  }
}
