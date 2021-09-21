const router = require('express').Router()
const chatRoutes = require('./chatRoutes')

router.use('/', chatRoutes)

module.exports = router