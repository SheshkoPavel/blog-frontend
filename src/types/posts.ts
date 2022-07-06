export interface iPostState {
    posts: [];
    isLoading: boolean;
    error : null | string;
    page: number;
    limit: number;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
    SET_POSTS_PAGE = 'SET_POSTS_PAGE'
}