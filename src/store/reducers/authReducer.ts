import {Dispatch} from "redux";

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
    payload: IAuthState;
}

interface IAuthRegistration {
    type: AuthActionTypes.AUTH_REGISTER;
    payload: IAuthState;
}

interface IAuthLogout {
    type: AuthActionTypes.AUTH_LOGOUT;
    payload: IAuthState;
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
    user?: userAuth | null;
    message?: string | null;
    isAuth: boolean;
}

const initialAuthState: IAuthState = {
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


export const authReducer = (state = initialAuthState, action: AuthActions) => {
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
                user: action.payload,
                isAuth: true
            }
        case AuthActionTypes.AUTH_LOGOUT:
            return {
                state: initialAuthState
            }
        default : return state
    }
}

export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
    try {

    } catch (error) {

    }
}