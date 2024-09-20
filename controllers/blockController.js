const connection = require('../config/db');

exports.blockUsers = (req, res) => {
    const { ids } = req.body;
    const currentUserId = req.user.id;  // Get current logged-in user ID from token

    const sql = "UPDATE users SET status = 'blocked' WHERE id IN (?)";
    connection.query(sql, [ids], (err) => {
        if (err) return res.status(500).json({ message: 'Error blocking users'});

        // Check if the current user is in the blocked list
        if (ids.includes(currentUserId)) {
            return res.status(200).json({ message: 'Users blocked!', currentUserBlocked: true });
        }

        res.status(200).json({ message: 'Users blocked!', currentUserBlocked: false });
    });
};
