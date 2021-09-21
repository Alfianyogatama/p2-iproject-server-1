const {User} = require('./../models')
const axios = require('axios')
const SECRET_KEY_TALKJS = 'sk_test_AvUZlJu82mRr1UGJLWWGjBhuHoPhkUlL'
const SECRET_APP_KEY_TALKJS = 'twoPwBx0'
const baseURL = 'https://api.talkjs.com/v1' 
const talkJs = axios.create({
  baseURL: 'https://api.talkjs.com/v1',
  headers: {
  	Authorization: `Bearer ${SECRET_KEY_TALKJS}`}
});

const loginUser = async (req, res, next) => {
	try{
		const {email} = req.body
		const user = await User.findOne({
			where : {
				email
			}
		})

		if (user) {

			const logUser = {
				id: user.chatId,
				name: user.name,
				photoUrl: 'https://cdn.fakercloud.com/avatars/marklamb_128.jpg',
				headerPhotoUrl: 'https://cdn.fakercloud.com/avatars/marklamb_128.jpg',
				email: [`${user.email}`]
			};

			const signIn = await talkJs.put(`/${SECRET_APP_KEY_TALKJS}/users/${user.chatId}`, logUser)
			if (signIn) {
				const result = await talkJs.get(`/${SECRET_APP_KEY_TALKJS}/users/${user.chatId}`)
				console.log(result);
			}
		}else{
			throw ({name:'wrong email/passsword'})
		}
	}
	catch(err){
		res.send(err)
		// console.log(err);
		// next(err)
	}
} 

module.exports = {
	loginUser
}