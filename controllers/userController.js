const { User } = require("./../models");
const { createToken } = require("./../helpers/jwt");
const axios = require("axios");
const talkJs = axios.create({
	baseURL: "https://api.talkjs.com/v1",
	headers: {
		Authorization: `Bearer ${process.env.SECRET_KEY_TALKJS}`,
	},
});

class Controller {
	static async register(req, res, next) {
		try {
			const { name, email, password, gender, origin } = req.body;
			const imgUrl = req.imgUrl;
			const user = await User.create({
				name,
				email,
				password,
				imgUrl,
				gender,
				origin,
			});

			if (user) {
				
				const logUser = {
					id: user.chatId,
					name: user.name,
					photoUrl: user.imgUrl,
					headerPhotoUrl: user.imgUrl,
					email: [`${user.email}`],
					locale: user.origin,
				};

				const signIn = await talkJs.put(
					`/${process.env.TALKJS_APPID}/users/${user.chatId}`,
					logUser
				);

				if (signIn) {
					const result = await talkJs.get(
						`/${process.env.TALKJS_APPID}/users/${user.chatId}`
					);

					if (result) {
						const { data: chats } = await talkJs.get(
							`/${process.env.TALKJS_APPID}/users/${user.chatId}/conversations`
						);
						const access_token = createToken({
							id: user.chatId,
							email: user.email,
							chatId: user.chatId,
						});

						res.status(200).json({
							user: result.data,
							access_token,
							chats,
						});
					}
				}
			}

		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = Controller;