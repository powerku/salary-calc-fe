import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url || typeof url !== "string") {
    const serverTime = new Date().toUTCString();
    return res.status(200).json({ serverTime });
  }

  // URL 접두어 검사 및 HTTPS 적용
  const urlWithHttp =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  try {
    const response = await fetch(urlWithHttp, { method: "HEAD" });

    const serverDate = response.headers.get("date");

    if (!serverDate) {
      return res
        .status(502)
        .json({ error: "Date header not found in response" });
    }

    res.status(200).json({ result: serverDate });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch server time", detail: error.message });
    }
    return res.status(500).json({ error: "Unknown error occurred" });
  }
}
