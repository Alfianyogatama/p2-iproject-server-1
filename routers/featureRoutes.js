const router = require('express').Router()
const featureController = require('./../controllers/featureController')
const errHandler = require('./../middlewares/errHandler')
const {authentication} = require('./../middlewares/auth')

router.use(authentication)
router.get('/leagues/standings/:name', featureController.getStandings)
router.use(errHandler)

module.exports = router