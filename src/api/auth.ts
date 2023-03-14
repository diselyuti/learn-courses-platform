import axios from "axios";
import {API_URL, API_VERSION} from "@/constants";

export async function getToken() {
	const token = sessionStorage.getItem('token')
	if (token) return token;

	try {
		const { data } = await axios.get(API_URL + API_VERSION + "/auth/anonymous?platform=subscriptions");
		if (data.token) sessionStorage.setItem('token', data.token)
		return data.token;
	} catch (e) {
		console.error(e)
	}
}