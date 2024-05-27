const mysql2 = require("mysql2");

const connection = mysql2.createPool({
host :"localhost",
password :"root123",
database : "dockerdatabase",
user : "root"
});

module.exports = connection
