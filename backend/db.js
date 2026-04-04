import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mathoff_app",
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error conexión:", err);
  } else {
    console.log("✅ MySQL conectado");
  }
});