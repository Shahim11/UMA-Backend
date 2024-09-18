const connection = require('../config/db');

exports.unblockUsers = (req, res) => {
    const { ids } = req.body;
    const sql = "UPDATE users SET status = 'active' WHERE id IN (?)";
    connection.query(sql, [ids], (err) => {
        if (err) return res.status(500).send('Error unblocking users');
        res.send('Users unblocked');
    });
};
