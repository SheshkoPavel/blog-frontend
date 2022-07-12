import {Dispatch} from "redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthActions, AuthActionTypes, IAuthState, userAuth} from "../../types/authTypes";


let initialAuthState: IAuthState;
    if (localStorage.getItem('token') !== null)  {
        const token = localStorage.getItem('token');
        if (token != null) {
            initialAuthState = jwt_decode(token);
            initialAuthState.isAuth = true;
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
                ...state,
                isAuth: false
            }
        case AuthActionTypes.SET_USER :
            return {
                ...state,
                user: action.payload,
                message: action.payload.message
            }
        default : return state
    }
}

export const loginUserThunk = (email: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/login',
            {email: email, password: password})
        const decoded_response: userAuth = jwt_decode(response.data.token);
        localStorage.setItem('token', response.data.token )
        dispatch({type: AuthActionTypes.AUTH_LOGIN,
            payload: decoded_response})
    } catch (error) {
        dispatch({type: AuthActionTypes.AUTH_LOGIN_ERROR, payload: 'Ошибка'})
    }
}

export const logoutUserThunk = () => async (dispatch: Dispatch<AuthActions> ) => {
        dispatch({type: AuthActionTypes.AUTH_LOGOUT});
        localStorage.removeItem('token')
}

export const registerUserThunk = (email: string, password: string, name: string, avatar: any) =>
    async (dispatch: Dispatch<AuthActions> ) => {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('avatar', avatar);

            const response = await axios.post('http://localhost:5000/auth/registration',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const decoded_response: userAuth = jwt_decode(response.data.token);

            localStorage.setItem('token', response.data.token )
            dispatch({type: AuthActionTypes.AUTH_LOGIN,
                payload: decoded_response})

}

export const setUserThunk = () => async (dispatch: Dispatch<AuthActions> )  => {
    try {
        const token = localStorage.getItem('token');
        if (token != null) {
            const decodedToken: userAuth = jwt_decode(token);
            dispatch({type: AuthActionTypes.SET_USER, payload: decodedToken})
        }
    } catch (error) {
        console.log('something goes wrong')
    }
}