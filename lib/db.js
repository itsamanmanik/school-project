import mysql from "mysql2/promise";

export async function connectDB() {
  const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "schoolDB",
  };

  // If you set DB_SSL=true in env (AlwaysData may require this), include SSL
  if (process.env.DB_SSL === "true") {
    config.ssl = { rejectUnauthorized: true };
  }

  const connection = await mysql.createConnection(config);
  return connection;
}
