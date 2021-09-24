const errHandler = (err, req, res, next) => {
	let message = "Internal server error"
	let code = 500

	switch (err.name){


		case "SequelizeValidationError":
		message = err.errors.map(e => e.message)
		code = 400
		break

		case "SequelizeUniqueConstraintError":
		if (err.errors[0].message === "name must be unique") {
			message = ["Name for this Group already taken"]
		}else{
			message = ["Email already registered"]
		}
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

		case "wrong email/passsword":
		message = ["Worng Email/passsword"]
		code = 401
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
		message = ["Group image is required"]
		break

		case "Email already registered":
		code = 400
		message = ["Email already registered"]
		break

		default:
		break
	}


	if (err.response) {
		message = err.response.statusText
		code= err.response.status
	}else if(err.message === "name must be unique"){
		message = ["Group name already taken"]
		code= 400
	}

	if (err.message === "File too large") {
		message = ["Max image size 255kb"]
		code = 400
	}
	
	// res.send(err)
	res.status(code).json({message})

}

module.exports = errHandler