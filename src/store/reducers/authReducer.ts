import {Dispatch} from "redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

export enum AuthActionTypes {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR',
    AUTH_REGISTER = 'AUTH_REGISTER',
    AUTH_LOGOUT = 'AUTH_LOGOUT'
}

interface IAuthLogin {
    type: AuthActionTypes.AUTH_LOGIN;
    payload: userAuth;
}

interface IAuthError {
    type: AuthActionTypes.AUTH_LOGIN_ERROR;
    payload: string;
}

interface IAuthRegistration {
    type: AuthActionTypes.AUTH_REGISTER;
    payload: IAuthState;
}

interface IAuthLogout {
    type: AuthActionTypes.AUTH_LOGOUT;
}

export type AuthActions = IAuthLogin | IAuthError | IAuthRegistration | IAuthLogout

export type userAuth = {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
    roles: userRoles[];
}

export type userRoles = {
    id: number;
    value: string;
    description: string;
}

export interface IAuthState {
    user: userAuth | null;
    message: string | null | undefined;
    isAuth: boolean;
}

let initialAuthState: IAuthState;
    if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token');
        if (token != null) {
            initialAuthState = jwt_decode(token);
            initialAuthState.isAuth = true
        }
    } else initialAuthState = {

        user: {
            id: 0,
            name: null,
            email: '',
            avatar: null,
            roles: [
                {id: 0, value: 'GUEST', description: 'Гость'}
            ]
        },
        message: null,
        isAuth: false
    }


export const authReducer = (state = initialAuthState, action: AuthActions): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_LOGIN :
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        case AuthActionTypes.AUTH_LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case AuthActionTypes.AUTH_REGISTER:
            return {
                ...state,
                user: action.payload.user,
                isAuth: true
            }
        case AuthActionTypes.AUTH_LOGOUT:
            return {
                ...state
            }
        default : return state
    }
}

export const loginUserThunk = (email: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/login',
            {email: email, password: password})
        const decoded_response: userAuth = jwt_decode(response.data.token);
        console.log(decoded_response);
        localStorage.setItem('token', response.data.token )
        dispatch({type: AuthActionTypes.AUTH_LOGIN,
            payload: decoded_response})
    } catch (error) {
        dispatch({type: AuthActionTypes.AUTH_LOGIN_ERROR, payload: 'error'})
    }
}