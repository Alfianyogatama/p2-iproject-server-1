const { User } = require("./../models");
const { createToken } = require("./../helpers/jwt");

class Controller {
	static async register(req, res, next){
		try {
			const { name, email, password, imgUrl, gender, origin } = req.body;
			const result = await User.create({
				name,
				email,
				password,
				imgUrl,
				gender,
				origin,
			});

			const access_token = createToken({
				id: result.id,
				email: result.email,
				chatId: result.chatId
			})
			res.status(201).json({access_token})

		} catch (err) {
			next(err);
		}
	}

	/*static async login(req, res, next){
		try{
			
		}
		catch(err){
			next(err)
		}
	}*/
}

module.exports = Controller;