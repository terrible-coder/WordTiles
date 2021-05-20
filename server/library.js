const fetch = require("node-fetch");
require("dotenv").config();

/**
 * The authentication token for the Telegram Bot API.
 * 
 * **MAKE SURE NOT TO MAKE THIS PUBLIC.**
 */
const TG_TOKEN = process.env.TG_TOKEN;

/**
 * The mandatory part of the URL used to make any and every API calls.
 * 
 * **MAKE SURE NOT TO MAKE THIS PUBLIC.**
 */
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

/**
 * Checks whether connection to the Telegram API has been successfully
 * established. Make sure to call this before making any other API calls to
 * avoid leaking tokens publicly.
 */
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