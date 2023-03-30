const Message = require('../models/message.model');
const User = require('../models/user.model');

// Retrieve all Messages from the database.
//get all message with user informations

const findAll = () => {
    return Message.findAll({
        include: [{
            model: User
        }]
    })
}


// Create and Save a new Message
//
const create = (message) => {
    return Message.create({
        contenu: message.contenu,
        date: new Date(),
        userId: message.userId
    })

}

module.exports = {
    findAll,
    create
}
