export interface IPostState {
    posts: any[];
    post: any;
    isLoading: boolean;
    error : null | string;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
    FETCH_ONE_POST = 'FETCH_ONE_POST',
    FETCH_ONE_POSTS_SUCCESS = 'FETCH_ONE_POSTS_SUCCESS'
}

interface IFetchPostsAction {
    type: PostActionTypes.FETCH_POSTS;
}

interface IFetchPostsSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: any[];
}


interface IFetchPostsErrorAction {
    type: PostActionTypes.FETCH_POSTS_ERROR;
    payload: string;
}

interface IFetchOnePostAction {
    type: PostActionTypes.FETCH_ONE_POST;
    payload: string;
}

interface IFetchOnePostSuccessAction {
    type: PostActionTypes.FETCH_ONE_POSTS_SUCCESS;
    payload: object;
}

export type PostAction = IFetchPostsAction
    | IFetchPostsSuccessAction
    | IFetchPostsErrorAction
    | IFetchOnePostAction
    | IFetchOnePostSuccessAction