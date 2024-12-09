import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(
    to: string[],
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_EMAIL_SENDER,
      subject,
      text,
      html,
    };

    try {
      await sgMail.sendMultiple(msg);
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  }
}
