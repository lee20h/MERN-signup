import { LOGIN_USER } from '../_actions/types';

export default function (state = {}, aciton) {
    switch (aciton.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: aciton.payload }
            
        default:
            return state;
    }
}