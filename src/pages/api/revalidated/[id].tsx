import type { NextApiRequest, NextApiResponse } from "next";
import toast from "react-hot-toast";

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
  console.log("🚀 ~ file: api/revalidate ~ res", res);
  console.log("🚀 ~file:  api/revalidate ~ req", req);
  const {
    query: { id },
  } = req;

  // if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //   return res.status(401).json({ message: "Your secret is invalid !" });
  // }
  let revalidated = false;
  try {
    await res.revalidate(`/content/${id}`);
    revalidated = true;
  } catch (error: any) {
    toast.error(error.message);
  }
  res.json({
    revalidated,
  });
}
