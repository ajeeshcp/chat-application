const { body } = require('express-validator');

exports.validate = (validationType) => {
    switch (validationType) {
        case 'create': {
            return [ 
                body('name', 'Name doesnt exists').exists(),
               ]  
            }
        case 'addMember': {
            return [ 
                body('groupId', 'groupId doesnt exists').exists().isNumeric(),
                body('userId', 'userId doest exist').exists().isNumeric(),
                ]  
            }
        case 'removeMember': {
            return [ 
                body('groupId', 'groupId doesnt exists').exists().isNumeric(),
                body('userId', 'userId doest exist').exists().isNumeric(),
                ]  
            }
        default:
            break;
    }
}