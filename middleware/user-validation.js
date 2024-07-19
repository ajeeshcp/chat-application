const { body } = require('express-validator');

exports.validate = (validationType) => {
    switch (validationType) {
        case 'register': {
            return [ 
                body('username', 'Name doesnt exists').exists(),
                body('password', 'password doesnt exists').exists(),
               ]  
            }
        case 'login': {
            return [ 
                body('username', 'Name doesnt exists').exists(),
                body('password', 'password doesnt exists').exists(),
                ]  
            }
        default:
            break;
    }
}