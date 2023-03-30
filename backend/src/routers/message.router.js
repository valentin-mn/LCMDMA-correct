const Router = require("express").Router;
const MessageController = require("../controllers/message.controller");

const router = Router();

router.get("/", MessageController.getAllMessages);

router.post("/", MessageController.createMessage);


module.exports = router;
