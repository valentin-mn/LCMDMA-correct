const MessageService = require('../services/message.service.js');

//func getAllMessages
const getAllMessages = (req, res) => {
    MessageService.findAll()
        .then((messages) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}
//func createMessage
const createMessage = (req, res) => {
    let message = {
        contenu: req.body.contenu,
        date: new Date(),
        userId: req.body.userId
    }
    MessageService.create(message).then((message) => {
        res.status(200).json(message);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

const createMessageFromSocket = (message) => {
    let msgToCreate = {
        contenu: message.contenu,
        date: new Date(),
        userId: message.userId
    }
    return MessageService.create(message);
}

//export
module.exports = {
    getAllMessages,
    createMessage,
    createMessageFromSocket
}