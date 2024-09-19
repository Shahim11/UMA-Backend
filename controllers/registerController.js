const bcrypt = require('bcryptjs');
const connection = require('../config/db');

exports.register = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://rad-pithivier-11ed02.netlify.app');  // Frontend domain
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight (OPTIONS) request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();  // Respond to preflight request with no content
    }

    // Actual registration logic
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    connection.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // Handle unique constraint violation (duplicate email)
                return res.status(400).send('Email already registered');
            }
            return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered');
    });
};
