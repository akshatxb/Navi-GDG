import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://discrete-lion-fairly.ngrok-free.app/api/v1/auth',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

export default authApi

