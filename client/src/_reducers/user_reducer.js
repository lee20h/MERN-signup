import { AUTH_USER, LOGIN_USER, REGISTER_USER } from '../_actions/types';

export default function (state = {}, aciton) {
    switch (aciton.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: aciton.payload }
        case REGISTER_USER:
            return { ...state, register: aciton.payload }
        case AUTH_USER:
            return { ...state, UserData: aciton.payload }
        default:
            return state;
    }
}