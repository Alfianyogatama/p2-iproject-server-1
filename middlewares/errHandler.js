const errHandler = (err, req, res, next) => {
	let message = "Internal server error"
	let code = 500

	switch (err.name){
		case "SequelizeValidationError":
		message = err.errors.map(e => e.message)
		code = 400
		break
	}
	// res.send(err)
	res.status(code).json(message)

}

module.exports = errHandler