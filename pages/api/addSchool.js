import { connectDB } from "../../lib/db";
import { getTokenFromReq, verifyToken } from "../../lib/auth";  // 🔑 import helpers

export default async function handler(req, res) {
  if (req.method === "POST") {
    // ✅ Check authentication
    const token = getTokenFromReq(req);
    const user = token ? verifyToken(token) : null;

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // If authenticated, proceed with school insert
    const { name, address, city, state, contact, email_id, image } = req.body;

    try {
      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      res.status(200).json({ message: "School added successfully!" });
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ message: "Error adding school", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
