import axios from "axios";

const aiAxios = axios.create({
	baseURL: "https://ary.ngrok.app",
	timeout: 30000,
	headers: {
		"Cache-Control": "no-cache",
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "*",
		"ngrok-skip-browser-warning": true,
	},
	withCredentials: true,
	responseType: "text",
});

export default aiAxios;
