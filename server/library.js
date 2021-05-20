const fetch = require("node-fetch");
require("dotenv").config();

const TG_TOKEN = process.env.TG_TOKEN;

const baseURL = `https://api.telegram.org/bot${TG_TOKEN}`;

/**
 * Creates the URL for any API method with the arguments.
 * @param {string} method The name of the API method to call.
 * @param {JSON} options JSON of the arguments to pass to the method.
 * @returns The query URL.
 */
function apiCall(method, options) {
	if(options === undefined) return `${baseURL}/${method}`;
	const params = Object.getOwnPropertyNames(options);
	const query = params.map(p => {
		return {
			param: p,
			value: options[p]
		}
	});
	const query_string = query.map(q => `${q.param}=${q.value}`).join("&");
	return `${baseURL}/${method}?${query_string}`;
}


function check() {
	const checkURL = apiCall("getMe");
	fetch(checkURL)
		.then(data => data.json())
		.then(json => {
			if(!json.ok) {
				console.log("Could not connect to Telegram Bot API.");
				console.log("Terminating...");
				process.exit(1);
			} else console.log(`${json.result.username} online.`);
		});
}

module.exports = {
	apiCall: apiCall,
	check: check
}