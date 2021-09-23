const { User } = require("./../models");
const { createToken } = require("./../helpers/jwt");
const {bcryp} = require("./../helpers/bcrypt")
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

			const user = await User.findOne({
				where: {
					email,
				},
			});

			if (user) {
				throw { name: "Email already registered" };
			} else {
				const createUser = await User.create({
					name,
					email,
					password,
					imgUrl,
					gender,
					origin,
				});

				if (createUser) {
					const logUser = {
						id: createUser.chatId,
						name: createUser.name,
						photoUrl: createUser.imgUrl,
						headerPhotoUrl: createUser.imgUrl,
						email: [`${createUser.email}`],
						locale: createUser.origin,
					};

					const signIn = await talkJs.put(
						`/${process.env.TALKJS_APPID}/users/${createUser.chatId}`,
						{
							name: createUser.name,
							email: [`${createUser.email}`],
							photoUrl: createUser.imgUrl,
							role: "user",
						}
					);
					if (signIn) {
						const result = await talkJs.get(
							`/${process.env.TALKJS_APPID}/users/${createUser.chatId}`
						);

						if (result) {
							const { data: chats } = await talkJs.get(
								`/${process.env.TALKJS_APPID}/users/${createUser.chatId}/conversations`
							);
							const access_token = createToken({
								id: createUser.id,
								email: createUser.email,
								chatId: createUser.chatId,
							});

							res.status(200).json({
								user: {
									id: createUser.id,
									name: createUser.name,
									email: createUser.email,
									chatId: createUser.chatId,
									photoUrl: createUser.imgUrl,
								},
								access_token,
								chats,
							});
						}
					}
				}
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;