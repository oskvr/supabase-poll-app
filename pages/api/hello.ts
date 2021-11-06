// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const forwarded = req.headers["'x-userip'"];
  // console.log(forwarded);
  res.status(200).json({ name: "John Doe" });
}
