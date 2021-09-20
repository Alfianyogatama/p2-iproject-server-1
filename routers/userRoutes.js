const router = require('express').Router()
const Controller = require('./../controllers/userController')
const errHandler = require('./../middlewares/errHandler')

router.post('/register', Controller.register)

router.use(errHandler)

module.exports = router