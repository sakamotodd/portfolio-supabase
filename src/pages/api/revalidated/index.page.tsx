import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
};

type Msg = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>,
) {
  console.log("Revalidataing notes page...");
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Your secret is invalid !" });
  }
  let revalidated = false;
  try {
    await res.revalidate("/content");
    revalidated = true;
  } catch (error) {
    console.log(error);
  }
  res.json({
    revalidated,
  });
}
