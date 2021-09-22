const multer = require('multer')
const storage = multer.memoryStorage()

const upload = multer({
	storage : storage,
	limits : {
		fileSize : 255000
	},
	fileFilter : (req, file, cb) => {
		if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
			cb(null, true)
		}else{
			cb (new Error())
		}
	}
})

module.exports = upload