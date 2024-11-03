const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hemant@123',
    database: 'schooldb'
});

pool.getConnection((err,) => {
    if (err) {
        console.log("Error in Database Connection",JSON.stringify(err,undefined,2));
    } else {
        console.log('Connected to Database Successfully');
    }
});

module.exports = pool;