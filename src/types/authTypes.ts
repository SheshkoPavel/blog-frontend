export enum AuthActionTypes {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR',
    AUTH_REGISTER = 'AUTH_REGISTER',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    SET_USER = 'SET_USER'
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

interface IAuthSetUser {
    type: AuthActionTypes.SET_USER;
    payload: userAuth;
}

export type AuthActions = IAuthLogin | IAuthError | IAuthRegistration | IAuthLogout | IAuthSetUser

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