const { User, Group, UserGroup } = require("./../models");
const { createToken } = require("./../helpers/jwt");
const { comparePass } = require("./../helpers/bcrypt");
const { Op } = require("sequelize");
const axios = require("axios");

const SECRET_KEY_TALKJS = process.env.SECRET_KEY_TALKJS;
const SECRET_APP_KEY_TALKJS = process.env.TALKJS_APPID;
const talkJs = axios.create({
	baseURL: "https://api.talkjs.com/v1",
	headers: {
		Authorization: `Bearer ${SECRET_KEY_TALKJS}`,
	},
});

class Controller {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({
				where: {
					email,
				},
			});

			if (user) {
				const checkPass = comparePass(password, user.password);

				if (checkPass) {
					const logUser = {
						id: user.chatId,
						name: user.name,
						photoUrl: user.imgUrl,
						headerPhotoUrl: user.imgUrl,
						email: [`${user.email}`],
						origin: user.origin,
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
								id: user.id,
								email: user.email,
								chatId: user.chatId,
							});

							res.status(200).json({
								user: {
									id: user.id,
									name: user.name,
									email: user.email,
									chatId: user.chatId,
									photoUrl: user.imgUrl,
								},
								access_token,
								chats,
							});
						}
					}

				} else {
					throw { name: "wrong email/passsword" };
				}

			}
			else {
				throw { name: "wrong email/passsword" };
			}
		
		}

		catch (err) {
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
			} else {
				throw { name: "not found conversations" };
			}
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async createGroup(req, res, next) {
		try {
			const { id: UserId, chatId } = req.user;
			const imgUrl = req.imgUrl;
			let { name, subject, topic, welcomeMessages } = req.body;
			welcomeMessages = welcomeMessages
				? welcomeMessages
				: `Wellcome to ${subject}`;

			const group = await Group.create({
				name,
				subject,
				imageUrl: imgUrl,
			});

			const result = await talkJs.put(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${name}`,
				{
					participants: [`${chatId}`],
					subject: subject,
					custom: {
						tag: topic,
					},
					welcomeMessages: [`${welcomeMessages}`],
					photoUrl: imgUrl,
				}
			);

			if (result) {
				await UserGroup.create({
					UserId,
					GroupId: group.id,
				});

				res.status(201).json({
					message: `New Group with id ${name} created successfully`,
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
			next(err);
		}
	}

	static async getMessages(req, res, next) {
		try {
			const { conversationId } = req.body;
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
			const { id: UserId, chatId } = req.user;

			let { data } = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/users/${chatId}/conversations`
			);

			if (data) {
				data = data.data.map((e) => {
					let participants = Object.keys(e.participants);
					return {
						name: e.id,
						tag: e.custom.tag,
						photoUrl: e.photoUrl,
						subject: e.subject,
						welcomeMessages: e.welcomeMessages,
						participants: participants.length,
					};
				});

				res.status(200).json({ data });
			}
		} catch (err) {
			next(err);
		}
	}

	static async groupInfo(req, res, next) {
		try {
			const groupId = req.params.id;
			let { data } = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${groupId}`
			);

			let participants = Object.keys(data.participants);
			data = {
				name: data.id,
				tag: data.custom.tag,
				photoUrl: data.photoUrl,
				subject: data.subject,
				welcomeMessages: data.welcomeMessages,
				participants: participants.length,
			};

			res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async deleteGroup(req, res, next) {
		try {
			const groupId = req.params.id;
			const result = await talkJs.delete(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${groupId}`
			);
			if (result) {
				res.status(200).json({
					message: `Group ${groupId} deleted successfully`,
				});
			}
		} catch (err) {
			next(err);
		}
	}

	static async searchGroup(req, res, next) {
		try {
			const chatId = req.params.id;
			const result = await Group.findAll({
				where: {
					[Op.or]: {
						name: {
							[Op.iLike]: `%${chatId}%`,
						},
					},
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

}

module.exports = Controller;