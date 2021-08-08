const config = require('../config/config.js');
const auth = require('../services/authService.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let email = event['email'];
    let password = event['password'];
    auth(email, function(err, result){
        if (!err) {
            if (result.length == 1) {
                if ((password == null) || (result[0] == null)) {
                    return callback("Login Has Failed", null);
                }
                console.log(config.JWTKey)
                if (bcrypt.compareSync(password, result[0].user_password) == true) {
                    let data = {
                        user_id: result[0].user_id,
                        role_name: result[0].role_name,
                        token: jwt.sign({ id: result[0].user_id }, config.JWTKey, {
                            expiresIn: 86400
                        })
                    };

                    return callback(null, data);
                } else {
                    return callback("Login Has Failed", null);
                } 
            } 
        }
    })
}