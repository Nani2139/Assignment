const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your DB username
  password: 'Udayiiitl@039', // Replace with your DB password
  database: 'lead_management', // DB name
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
