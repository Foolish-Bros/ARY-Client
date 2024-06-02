import axios from "axios";

const aiAxios = axios.create({
	baseURL: "https://ary.ngrok.app",
	timeout: 30000,
	headers: {
		// "Cache-Control": "no-cache",
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "http://localhost:3000",
		"ngrok-skip-browser-warning": "25040",
	},
	withCredentials: false,
	responseType: "text",
});

export default aiAxios;
