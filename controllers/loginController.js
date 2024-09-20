const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'User not found!'});
        
        const user = results[0];
        if (user.status === 'blocked') return res.status(403).json({ message: 'User is blocked!'});
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(403).json({ message: 'Invalid password!'});
        
        // Update last_login_time
        const updateLoginTimeSql = 'UPDATE users SET last_login_time = CURRENT_TIMESTAMP WHERE id = ?';
        connection.query(updateLoginTimeSql, [user.id], (updateErr) => {
            if (updateErr) return res.status(500).json({ message: 'Error updating last login time'});
            
            // Generate token after successful login
            const token = jwt.sign({ id: user.id, name: user.name }, 'secret_key');
            res.json({ token, username: user.name });  // Return token and username
        });
    });
};
