const generateChatId = () => {
	const now = new Date()
	let timestamp 
	timestamp = now.getFullYear().toString() 
	timestamp += now.getMonth().toString() 
	timestamp += now.getDate().toString()
	timestamp += now.getHours().toString()
	timestamp += now.getMinutes().toString()
	timestamp += now.getMilliseconds().toString()
	return timestamp
}

module.exports = generateChatId