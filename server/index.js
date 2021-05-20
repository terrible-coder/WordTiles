const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const TG_TOKEN = process.env.TG_TOKEN;

const app = express();
app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`));
app.use(express.static("public"));

const baseURL = `https://api.telegram.org/bot${TG_TOKEN}`;

const checkURL = `${baseURL}/getMe`;
fetch(checkURL)
	.then(data => data.json())
	.then(json => {
		if(!json.ok) {
			console.log("Could not connect to Telegram Bot API.");
			console.log("Terminating...");
			process.exit(1);
		} else console.log(`${json.result.username} online.`);
	});