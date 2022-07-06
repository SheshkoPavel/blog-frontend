import axios from "axios";
import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from "../../types/users";

export const fetchUsers = () => async (dispatch: Dispatch<UserAction>) => {
    try {
        dispatch({type: UserActionTypes.FETCH_USERS})
        const response = await axios.get('http://localhost:5000/users')
        dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({
            type: UserActionTypes.FETCH_USERS_ERROR,
            payload: 'Error loading users'
        })
    }
}