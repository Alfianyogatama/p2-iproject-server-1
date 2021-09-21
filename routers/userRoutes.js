const router = require('express').Router()
const Controller = require('./../controllers/userController')
const chatController = require('./../controllers/chatController')
const errHandler = require('./../middlewares/errHandler')

router.post('/register', Controller.register)
router.post('/login', chatController.login)


router.use(errHandler)

module.exports = router