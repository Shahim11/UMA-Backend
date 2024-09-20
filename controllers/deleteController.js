const connection = require('../config/db');
const jwt = require('jsonwebtoken');  // Import JWT for decoding tokens

exports.deleteUsers = (req, res) => {
    const { ids } = req.body;
    const currentUserId = req.user.id; // Get the current logged-in user's ID from the token

    const sql = 'DELETE FROM users WHERE id IN (?)';
    connection.query(sql, [ids], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting users'});
        // Check if the current user is among the deleted users
        if (ids.includes(currentUserId)) {
            return res.status(200).json({ message: 'Users deleted', currentUserDeleted: true });
        }

        res.status(200).json({ message: 'Users deleted', currentUserDeleted: false });
    });
};





// const connection = require('../config/db');

// exports.deleteUsers = (req, res) => {
//     const { ids } = req.body;
//     const sql = 'DELETE FROM users WHERE id IN (?)';
//     connection.query(sql, [ids], (err) => {
//         if (err) return res.status(500).send('Error deleting users');
//         res.send('Users deleted');
//     });
// };
