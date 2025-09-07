import Mail from 'nodemailer/lib/mailer';
import { SendMailOptions } from './../../node_modules/@types/nodemailer/index.d';
import nodemailer from 'nodemailer';

export const sendEmail = async (mailOptions: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Wassabi 😜" <${process.env.NODE_MAILER_EMAIL}>`,
    ...mailOptions,
  });

  if (info.accepted.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const generateOTP = async () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
};
