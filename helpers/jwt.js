const jwt = require('jsonwebtoken')
const result = require('dotenv').config()
const secret = '34020202020202202'

const createToken = (obj) => {
	return jwt.sign(obj, secret)
}

const verifyToken = (token) => {
	return jwt.verify(token, secret)
}

module.exports = {
	createToken,
	verifyToken
}