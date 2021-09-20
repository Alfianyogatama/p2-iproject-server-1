const express = require('express')
const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, () => {
	console.log('listening to', port);
})