import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, email_id, image } = req.body;

    try {
      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      // ✅ Always return a JSON with "message"
      res.status(200).json({ message: "School added successfully!" });
    } catch (error) {
  console.error("Database Error:", error); // 👈 shows in terminal
  res.status(500).json({ message: "Error adding school", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
