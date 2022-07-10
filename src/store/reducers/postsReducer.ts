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
                isLoading: true
            }
        case PostActionTypes.FETCH_ONE_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                post: action.payload
            }
        case PostActionTypes.LOAD_ALL_USER_POSTS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case PostActionTypes.FILTER_POSTS_BY_STATUS_PUBLISHED :
            const comingPosts = state.posts;
            const filteredPostsByStatusPublished = state.posts.filter(post => post.status === 'PUBLISHED')
            return {
                ...state,
                posts: filteredPostsByStatusPublished,
                isLoading: false
            }
        case PostActionTypes.FILTER_POSTS_BY_STATUS_SAVED :
            const filteredPostsByStatusSaved = state.posts.filter(post => post.status === 'SAVED')
            return {
                ...state,
                posts: filteredPostsByStatusSaved,
                isLoading: false
            }
        default : return state
    }
}