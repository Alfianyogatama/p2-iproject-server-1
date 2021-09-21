const {User} = require('./../models')
const {verifyToken} = require('./../helpers/jwt')

const authentication = async (req, res, next) => {
	try{
		const {access_token} = req.headers
		if (!access_token) {
			throw ({name : "invalid token"})
		}else{
			const user =  verifyToken(access_token)
			if (!user) {
				throw ({name : "invalid token"})
			}else{
				req.user = {
					id : user.id,
					chatId: user.chatId,
					email : user.email
				}

				next()
			}
		}
	}
	catch(err){
		next(err)
	}
}	

module.exports = {
	authentication
}