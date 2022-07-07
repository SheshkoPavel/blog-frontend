import {IPostState, PostAction, PostActionTypes} from "../../types/posts";

const initialState: IPostState = {
    posts : [],
    post: {},
    isLoading: false,
    error: null
}

export const postsReducer = (state = initialState, action: PostAction): IPostState  => {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS:
            return  {
                ...state,
                isLoading: true
            }
        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case PostActionTypes.FETCH_POSTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case PostActionTypes.FETCH_ONE_POST:
            return {
                ...state,
                isLoading: false
            }
        case PostActionTypes.FETCH_ONE_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: action.payload
            }
        default : return state
    }
}