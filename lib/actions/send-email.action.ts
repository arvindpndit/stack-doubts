'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAnswerEmail({
  recipientEmail,
  questionTitle,
  id,
}: {
  recipientEmail: string;
  questionTitle: string;
  id: any;
}) {
  try {
    await resend.emails.send({
      from: 'stack doubts  <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `Your question "${questionTitle}" has a new answer!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f2f2f2; border-radius: 8px; background-color: #fff8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
          <!--<img src="https://stack-doubts.vercel.app/assest/images/stack-logo.png" alt="Stack Doubts Logo" style="width: 60px; height: 60px; border-radius: 8px;" />-->
          <h2>stack <span style="color: #e67e22;">doubts</span></h2>
          </div>

          <p style="font-size: 16px; color: #333;">
          Hi there,
          </p>

          <p style="font-size: 16px; color: #333;">
          Your question just received a new answer.
          </p>

          <blockquote style="margin: 16px 0; padding-left: 16px; border-left: 4px solid #e67e22; color: #555;">
          <em>${questionTitle}</em>
          </blockquote>

          <p style="font-size: 16px; color: #333;">
          Click below to check it out:
          </p>

          <div style="text-align: center; margin: 24px 0;">
          <a href="https://stack-doubts.vercel.app/question-details/${id}" style="background-color: #e67e22; color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
              View Answer
          </a>
          </div>

          <hr style="border: none; border-top: 1px solid #f2f2f2; margin: 30px 0;" />

          <p style="font-size: 12px; color: #999; text-align: center;">
          You're receiving this email because you asked a question on <strong>Stack Doubts</strong>.
          </p>
        </div>
        `,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

