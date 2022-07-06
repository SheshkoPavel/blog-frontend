import {IUserState, UserAction, UserActionTypes} from "../../types/users";

const initialState: IUserState = {
    users: [],
    isLoading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return {
                isLoading: true,
                error: null,
                users: []
            }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {
                isLoading: false,
                error: null,
                users: action.payload
            }
        case UserActionTypes.FETCH_USERS_ERROR:
            return {
                isLoading: false,
                error: action.payload,
                users: []
            }
        default:
            return state
    }
}