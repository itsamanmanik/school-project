import { connectDB } from "../../../lib/db";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Allowlist of users who can manage schools
const allowedUsers = [
  "mr.fab434@gmail.com"     // replace with your real admin email
      // add more if needed
];

export default async function handler(req, res) {
  console.log("OTP API hit"); // debug
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  // ✅ Restrict access
  if (!allowedUsers.includes(email)) {
    return res.status(403).json({ message: "You are not authorized to manage schools" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + (process.env.OTP_EXPIRY_MINUTES || 10) * 60000);

  const db = await connectDB();
  await db.execute(
    "INSERT INTO otps (email, otp_hash, expires_at) VALUES (?, ?, ?)",
    [email, otpHash, expiresAt]
  );

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: "Your Login OTP (valid 10 minutes)",
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <b>${otp}</b>. It expires in 10 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
}
