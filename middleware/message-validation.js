const { body, param } = require('express-validator');

exports.validate = (validationType) => {
    switch (validationType) {
        case 'getMessages': {
            return [ 
                param('groupId', 'groupId doesnt exists').exists().isNumeric(),
               ]  
            }
        case 'getIndividualMessages': {
            return [ 
                param('userId', 'groupId doesnt exists').exists().isNumeric(),
                ]  
            }
        default:
            break;
    }
}