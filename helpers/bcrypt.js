const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPass = (token) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(token, salt);
};

const comparePass = (token, hash) => {
	return bcrypt.compareSync(token, hash);
};

module.exports = {
	hashPass,
	comparePass,
};