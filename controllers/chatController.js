const { User, Group } = require("./../models");
const { createToken } = require("./../helpers/jwt");
const axios = require("axios");
const SECRET_KEY_TALKJS = "sk_test_AvUZlJu82mRr1UGJLWWGjBhuHoPhkUlL";
const SECRET_APP_KEY_TALKJS = "twoPwBx0";
const talkJs = axios.create({
	baseURL: "https://api.talkjs.com/v1",
	headers: {
		Authorization: `Bearer ${SECRET_KEY_TALKJS}`,
	},
});

class Controller {
	static async login(req, res, next) {
		try {
			const { email } = req.body;
			const user = await User.findOne({
				where: {
					email,
				},
			});

			if (user) {
				const logUser = {
					id: user.chatId,
					name: user.name,
					photoUrl: user.imgUrl,
					headerPhotoUrl: user.imgUrl,
					email: [`${user.email}`],
				};

				const signIn = await talkJs.put(
					`/${SECRET_APP_KEY_TALKJS}/users/${user.chatId}`,
					logUser
				);
				if (signIn) {
					const result = await talkJs.get(
						`/${SECRET_APP_KEY_TALKJS}/users/${user.chatId}`
					);

					if (result) {
						const { data: chats } = await talkJs.get(
							`/${SECRET_APP_KEY_TALKJS}/users/${user.chatId}/conversations`
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
			} else {
				throw { name: "wrong email/passsword" };
			}
		} catch (err) {
			next(err);
		}
	}

	static async joinChat(req, res, next) {
		try {
			const { chatId } = req.user;
			const { conversationId } = req.body;
			const join = await talkJs.put(
				`${SECRET_APP_KEY_TALKJS}/conversations/${conversationId}/participants/${chatId}`,
				{
					notify: true,
					access: "ReadWrite",
				}
			);
			if (join) {
				const result = await talkJs.get(
					`/${SECRET_APP_KEY_TALKJS}/conversations/${conversationId}`
				);
				res.status(201).json(result.data);
			}
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async createGroup(req, res, next) {
		try {
			const { chatId } = req.user;
			const { name, subject, imageUrl } = req.body;

			const newGroup = await talkJs.put(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${name}`,
				{
					participants: [`${chatId}`],
					subject: subject,
					welcomeMessages: [`Wellcome to ${name} group`],
					photoUrl: imageUrl,
				}
			);

			if (newGroup) {
				const result = await talkJs.get(
					`/${SECRET_APP_KEY_TALKJS}/conversations/${name}`
				);
				if (result) {
				}
				const group = await Group.create({
					name,
					subject,
					imageUrl,
				});
				res.status(201).json({
					Group: {
						result: result.data,
						group,
					},
				});
			}
		} catch (err) {
			next(err);
		}
	}

	static async sendMessage(req, res, next) {
		try {
			const { chatId } = req.user;
			const { messages, conversationId } = req.body;
			const { data } = await talkJs.post(
				`${SECRET_APP_KEY_TALKJS}/conversations/${conversationId}/messages`,
				[
					{
						text: messages,
						sender: chatId,
						type: "UserMessage",
					},
				]
			);
			res.status(201).json({ success: data });
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async getMessages(req, res, next) {
		try {
			const { conversationId } = req.body;
			console.log(req.body);
			const { data } = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${conversationId}/messages`
			);
			if (data) {
				res.status(200).json({ messages: data });
			}
		} catch (err) {
			next(err);
		}
	}

	static async conversationList(req, res, next) {
		try {
			const { chatId } = req.user;
			const { data: chats } = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/users/${chatId}/conversations`
			);
			if (chats) {
				res.status(200).json(chats);
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;