const axios = require("axios");
const formData = require("form-data");
const url = "https://upload.imagekit.io/api/v1/files/upload";

const getImageUrl = (req, res, next) => {
	if (req.body.image) {
		next();
	} else {
		if (!req.file) {
			throw ({name : "no file"})	
		}
		const newForm = new formData();
		newForm.append("file", req.file.buffer.toString("base64"));
		newForm.append("fileName", `branded_${req.body.name}`);
		newForm.append("folder", "branded_product");
		
		const privateKey = Buffer.from(
			process.env.IMAGE_KIT_PRIVATE,
			"utf-8"
		).toString("base64");

		axios({
			method: "POST",
			url,
			data: newForm,
			headers: {
				...newForm.getHeaders(),
				Authorization: `Basic ${privateKey}`,
			},
		})
			.then((response) => {
				req.imgUrl = response.data.url;
				next();
			})

			.catch((err) => {
				next(err);
			});
	}
};
module.exports = getImageUrl;
