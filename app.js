if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const cors = require("cors");
const express = require("express");
const app = express();
const router = require('./routers')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router)

app.listen(port, () => {
	console.log("listening to", port);
});