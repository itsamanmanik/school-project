import { getTokenFromReq, verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(200).json({ user: null });

  const payload = verifyToken(token);
  if (!payload) return res.status(200).json({ user: null });

  return res.status(200).json({ user: { email: payload.email } });
}
