const { User, Group, UserGroup } = require("./../models");
const { createToken } = require("./../helpers/jwt");
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
					origin: user.origin
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
			console.log(err)
			next(err);
		}
	}

	static async joinChat(req, res, next) {
		try {
			const { chatId } = req.user;
			const { conversationId } = req.body;
			console.log(conversationId, '<<<<<<<<');
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
			}else{
				throw({name:'not found conversations'})
			}
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async createGroup(req, res, next) {
		try {
			const { id:UserId, chatId } = req.user;
			const imgUrl = req.imgUrl
			let { name, subject, topic, welcomeMessages } = req.body;
			welcomeMessages = welcomeMessages ? welcomeMessages : `Wellcome to ${subject}`

			const group = await Group.create({
				name,
				subject,
				imageUrl: imgUrl,
			});


			if (group) {

				const userGroup = await UserGroup.create({
					UserId,
					GroupId: group.id
				})

				if (userGroup) {
					const newGroup = await talkJs.put(
						`/${SECRET_APP_KEY_TALKJS}/conversations/${name}`,
						{
							participants: [`${chatId}`],
							subject: subject,
							custom: {
								tag: topic
							},
							welcomeMessages: [`${welcomeMessages}`],
							photoUrl: imgUrl,
						}
					);

					if (newGroup) {
						const result = await talkJs.get(
							`/${SECRET_APP_KEY_TALKJS}/conversations/${name}`
						);
						if (result) {
							
						}
						
						res.status(201).json({
							Group: {
								result: result.data,
							},
						});
					}
				}


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
			const { id:UserId, chatId } = req.user;
			const { data: chats } = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/users/${chatId}/conversations`
			);
			if (chats) {
				const group = await UserGroup.findAll({
					where: {
						UserId
					},
					include: ["Group"]
				})
				res.status(200).json({chats: chats.data});
			}
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async groupInfo(req, res, next){
		try{

			const groupId = req.params.id
			const {data} = await talkJs.get(
				`/${SECRET_APP_KEY_TALKJS}/conversations/${groupId}`
				);

			const group = await Group.findOne({
				where: {
					name : groupId
				}
			})
			res.status(200).json({data, group})
			
		}
		catch(err){
			console.log(err);
			next(err)
		}
	}

	static async deleteGroup(req, res, next){
		try{
			const groupId = req.params.id
			const result = await talkJs.delete(`/${SECRET_APP_KEY_TALKJS}/conversations/${groupId}`)
			if (result) {
				res.status(200).json({message: `Group ${groupId} deleted successfully` })
			}
		}
		catch(err){
			console.log(err);
			next(err)
		}
	}

	static async searchGroup(req, res, next){
		try{
			const chatId = req.params.id
			const result = await Group.findAll({
				where : {
					[Op.or]: {
						name: {
							[Op.iLike]: `%${chatId}%`
						}
					} 
				}
			})

			res.status(200).json(result)
		}
		catch(err){
			console.log(err);
			next(err)
		}
	}
}

module.exports = Controller;