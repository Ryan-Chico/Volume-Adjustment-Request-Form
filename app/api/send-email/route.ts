import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Configure your email service
    // For Gmail, use an App Password: https://support.google.com/accounts/answer/185833
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ryanchico1223@gmail.com",
      subject: `Volume Adjustment Request - ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">VOLUME ADJUSTMENT REQUEST</h2>
          
          <h3>Requestor Information</h3>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          
          <h3>Request Details</h3>
          <p><strong>Requested Volume Level:</strong> ${body.requestedVolume}%</p>
          <p><strong>Priority:</strong> ${body.priority.toUpperCase()}</p>
          
          <h3>Justification</h3>
          <p>${body.reason || "No justification provided"}</p>
          
          <h3>Authorization</h3>
          <p><strong>Signature:</strong> ${body.signature}</p>
          
          <hr style="border: none; border-top: 2px solid #333; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">This is an automated email from the Volume Adjustment Request Form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
