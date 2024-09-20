const connection = require('../config/db');

exports.unblockUsers = (req, res) => {
    const { ids } = req.body;
    const sql = "UPDATE users SET status = 'active' WHERE id IN (?)";
    connection.query(sql, [ids], (err) => {
        if (err) return res.status(500).json({ message: 'Error unblocking users'});
        res.json({ message: 'Users unblocked!'});
    });
};
