const errHandler = (err, req, res, next) => {
	let message = "Internal server error"
	let code = 500

	switch (err.name){

		case "SequelizeValidationError":

		message = err.errors.map(e => e.message)
		code = 400
		break

		case "SequelizeUniqueConstraintError":
		message = ["Email already registered"]
		code = 400
		break

		case "invalid token":
		message = ["Invalid token/login"]
		code = 401
		break

		case "ValidationErrorItem":
		message = ["Invalid Url"]
		code = 400
		break		

		default:
		break
	}
	res.send(err)
	// res.status(code).json({message})

}

module.exports = errHandler