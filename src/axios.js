import axios from "axios";

const client = axios.create({
	baseURL: "https://backend.all-review-young.site",
	timeout: 8000,
	headers: {
		"Cache-Control": "no-cache",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
	responseType: "json",
});

export default client;
