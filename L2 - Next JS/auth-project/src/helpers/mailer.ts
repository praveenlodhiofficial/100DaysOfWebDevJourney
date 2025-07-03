import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 360000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 360000,
        },
      });
    }

    // added this from mailtrap
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"Praveen Lodhi" <praveenlodhi.official@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">${
            emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
          }</h2>
          <p>Hello!</p>
          <p>${
            emailType === "VERIFY"
              ? "Thank you for signing up. Please verify your email address by clicking the button below:"
              : "You requested to reset your password. Click the button below to create a new password:"
          }</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
            </a>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #007bff; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">
            ${process.env.DOMAIN}/verify-email?token=${hashedToken}
          </p>
          
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
          
          <p style="color: #666; font-size: 14px;">
            ${
              emailType === "VERIFY"
                ? "If you didn't create an account, you can safely ignore this email."
                : "If you didn't request a password reset, you can safely ignore this email."
            }
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="text-align: center; color: #666; font-size: 14px;">
            Best regards,<br>Your App Team
          </p>
        </div>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
