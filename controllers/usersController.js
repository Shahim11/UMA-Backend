const connection = require('../config/db');

exports.getUsers = (req, res) => {
    const sql = 'SELECT id, name, email, status, last_login_time, registration_time FROM users';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching users');
        res.json(results);
    });
};
