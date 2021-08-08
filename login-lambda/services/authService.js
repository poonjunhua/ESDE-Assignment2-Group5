const pool = require('../config/database.js');

const authenticate = (email, callback) => {
    console.log(pool)
    pool.getConnection((err, connection) => {
        if (!err) {
            const sql = "SELECT user.user_id, fullname, email, user_password, role_name, user.role_id FROM user INNER JOIN role ON user.role_id=role.role_id AND email=?"
            connection.query(sql, [email], (err, result) => {
                console.log(result)
                if (!err) {
                    return callback(null, result)
                } else if (err) {
                    return callback(err, null)
                } else {
                    return callback("Unexpected Login Error", null)
                }
            })
        } else if (err) {
            return callback(err, null)
        } else {
            return callback("Unexpected Connection Error", null)
        }
    })
}

module.exports = authenticate