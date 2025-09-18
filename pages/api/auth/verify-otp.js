import { connectDB } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, otp } = req.body;

  const db = await connectDB();
  const [rows] = await db.execute(
    "SELECT * FROM otps WHERE email = ? AND used = 0 ORDER BY id DESC LIMIT 1",
    [email]
  );
  const record = rows[0];
  if (!record) return res.status(400).json({ message: "No OTP found" });

  if (new Date(record.expires_at) < new Date())
    return res.status(400).json({ message: "OTP expired" });

  const ok = await bcrypt.compare(otp, record.otp_hash);
  if (!ok) return res.status(400).json({ message: "Invalid OTP" });

  await db.execute("UPDATE otps SET used = 1 WHERE id = ?", [record.id]);
  await db.execute(
    "INSERT INTO users (email) VALUES (?) ON DUPLICATE KEY UPDATE email=email",
    [email]
  );

  const token = signToken({ email });
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Logged in" });
}
