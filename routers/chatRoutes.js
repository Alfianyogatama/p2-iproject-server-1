const router = require('express').Router()
const Controller = require('./../controllers/userController')
const chatController = require('./../controllers/chatController')
const errHandler = require('./../middlewares/errHandler')
const {authentication} = require('./../middlewares/auth')
const upload = require('./../middlewares/multer')
const getImageUrl = require('./../middlewares/imagekit')

router.post('/register', upload.single('image'), getImageUrl, Controller.register)
router.post('/login', chatController.login)

router.use(authentication)
router.post('/chats/join', chatController.joinChat)
router.post('/chats/groups', upload.single('image'), getImageUrl, chatController.createGroup)
router.post('/chats/sends', chatController.sendMessage)
router.get('/chats/groups/info/:id', chatController.groupInfo)
router.get('/chats/groups/messages', chatController.getMessages)
router.get('/chats/lists', chatController.conversationList)
router.delete('/chats/:id', chatController.deleteGroup)
router.get('/chats/groups/:id', chatController.searchGroup)

router.use(errHandler)

module.exports = router