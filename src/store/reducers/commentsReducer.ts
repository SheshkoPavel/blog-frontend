import {CommentsActions, CommentsActionTypes, ICommentsState} from "../../types/commentsTypes";
import {Dispatch} from "redux";
import axios from "axios";


const initialState: ICommentsState = {
    comments: [
        {id: 0, author: 'Unknown', text: 'Отличная статья', postId: 0}
        ],
    isLoading: false,
    error: null
}

export const commentsReducer = (state = initialState, action: any): ICommentsState => {
    switch (action.type){
        case CommentsActionTypes.FETCH_COMMENTS :
            return {
                ...state,
                isLoading: true
            }
        case CommentsActionTypes.FETCH_COMMENTS_SUCCESS :
            return {
                isLoading: false,
                error: null,
                comments: action.payload
            }
        case CommentsActionTypes.FETCH_COMMENTS_ERROR :
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getCommentsByPostIdThunk = (postId: number) => async (dispatch: Dispatch<CommentsActions>) => {
    try {
        dispatch({type: CommentsActionTypes.FETCH_COMMENTS})
        const response = await axios.get(`http://localhost:5000/comments/${postId}`)
        dispatch({type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS, payload: response.data})
    } catch (error) {
        dispatch({type: CommentsActionTypes.FETCH_COMMENTS_ERROR, payload: 'Ошибка при загрузке комментариев'})
    }
}
