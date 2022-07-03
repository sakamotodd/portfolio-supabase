/* eslint-disable import/no-anonymous-default-export */
"use strict";
import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: "test@example.co.jp",
    to: process.env.MAIL_USER,
    subject: "お問い合わせ",
    text: req.body,
  });

  res.status(200).json({
    success: true,
  });
};
