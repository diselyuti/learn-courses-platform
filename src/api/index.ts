import axios from 'axios'
import { getToken } from './auth.js'
import {API_URL, API_VERSION} from "@/constants";

// Створюємо новий екземпляр Axios з налаштуваннями
const api = axios.create({
	baseURL: API_URL + API_VERSION + "/",
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Інтерсептор для додавання токену до запиту
api.interceptors.request.use(async (config) => {
	const token = await getToken()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
}, (error) => {
	return Promise.reject(error)
})

// Інтерсептор для обробки помилок від сервера
api.interceptors.response.use((response) => {
	return response
}, async (error) => {
	if (error.message === 'Network Error') {
		console.log('Network Error: Please check your internet connection and try again.')
	} else if (error.response) {
		if (error.response.status === 401) {
			console.log('Authentication Error: Please refresh page and try again.')
			await getToken();
		} else if (error.response.status === 404) {
			console.log('Error: The resource you are trying to access does not exist.')
		} else if (error.response.status >= 500) {
			console.log('Server Error: Please try again later.')
		} else {
			console.log(error.response.data)
			console.log(error.response.status)
			console.log(error.response.headers)
		}
	} else if (error.request) {
		console.log(error.request)
	} else {
		console.log('Error', error.message)
	}

	return Promise.reject(error)
})

// Експортуємо екземпляр Axios
export default api
