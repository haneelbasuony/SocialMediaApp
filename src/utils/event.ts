import { EventEmitter } from 'events';
import { generateOTP, sendEmail } from '../services/sendEmail';
import { EmailTemplate } from '../services/email.template';
export const eventEmitter = new EventEmitter();

eventEmitter.on('confirmEmail', async (data) => {
  const { email } = data;
  const otp = await generateOTP();
  await sendEmail({
    to: email,
    subject: 'Confirm Email',
    html: EmailTemplate(String(otp)),
  });
});
