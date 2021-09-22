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

		case "not listed league":
		message = ["Not listed"]
		code = 404
		break	

		case "not found conversations":
		code = 400
		message = ["conversation not found "]
		break

		case "no file" :
		code = 400
		message = ["Product image is required"]
		break

		default:
		break
	}

/*	switch (err.response.statusText){

		case
	}*/
	if (err.response) {
		message = err.response.statusText
		code= err.response.status
	}
	// console.log(err.data);
	// res.send(err)
	res.status(code).json({message})

}

module.exports = errHandler