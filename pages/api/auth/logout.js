import { serialize } from "cookie";

export default function handler(req, res) {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Logged out" });
}
