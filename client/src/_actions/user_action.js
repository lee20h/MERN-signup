import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';
export function loginUser(dataTosubmit) {
    const request = axios.post('http://localhost:5000/login', dataTosubmit, { withCredentials: true })
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('http://localhost:5000/register', dataTosubmit)
    .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}