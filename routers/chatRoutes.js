const router = require('express').Router()
const Controller = require('./../controllers/userController')
const chatController = require('./../controllers/chatController')
const errHandler = require('./../middlewares/errHandler')
const {authentication} = require('./../middlewares/auth')

router.post('/register', Controller.register)
router.post('/login', chatController.login)

router.use(authentication)
router.post('/chats/join', chatController.joinChat)
router.post('/chats/groups', chatController.createGroup)
router.post('/chats/sends', chatController.sendMessage)
router.get('/chats/groups/messages', chatController.getMessages)


router.use(errHandler)

module.exports = router