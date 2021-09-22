const router = require('express').Router()
const chatRoutes = require('./chatRoutes')
const featureRoutes = require('./featureRoutes')

router.use('/', chatRoutes)
router.use('/feature', featureRoutes)

module.exports = router