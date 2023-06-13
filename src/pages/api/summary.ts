// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi,
} from "openai";

type Error = {
  message: string;
  code: number;
};

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openAIApi = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateChatCompletionResponseChoicesInner | Error>
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed", code: 405 });
    return;
  }

  try {
    const body = JSON.parse(req.body);
    const completion = await openAIApi.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Please summarize the YouTube video transcript text, use funny and creative tone ${body.message}`,
        },
      ],
    });
    res.json(completion.data.choices[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error", code: 500 });
  }
}
