const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ SQL Server connected");
    return pool;
  })
  .catch(err => {
    console.error("❌ SQL Server connection failed:", err.message);
  });

module.exports = { sql, poolPromise };
