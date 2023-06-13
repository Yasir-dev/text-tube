import type { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "youtube-transcript";

type Data = {
  transcript: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const body = JSON.parse(req.body);
    const videoId = body.videoId;
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map((line) => line.text).join(" ");

    res.status(200).json({ transcript: transcriptText });
  } catch (error) {
    console.error(error);
  }
}
