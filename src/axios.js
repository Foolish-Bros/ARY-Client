import axios from "axios";

const client = axios.create({
	baseURL: "http://localhost:8080",
	timeout: 3000,
	headers: {
		"Cache-Control": "no-cache",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
	responseType: "json",
});

export default client;
