import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",       // change if your MySQL user is different
    password: "1234", // replace with your MySQL password
    database: "schoolDB",
  });
  return connection;
}
