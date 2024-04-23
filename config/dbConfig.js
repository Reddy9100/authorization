const mysql2 = require("mysql2");

const connection = mysql2.createPool({
  host: process.env.localhost,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
});

module.exports = connection