const jwt = require('jsonwebtoken')
const result = require('dotenv').config()

const createToken = (obj) => {
	return jwt.sign(obj, process.env.JWT_SECRET_KEY)
}

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = {
	createToken,
	verifyToken
}