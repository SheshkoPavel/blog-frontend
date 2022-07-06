export interface IPostState {
    posts: any[];
    isLoading: boolean;
    error : null | string;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'
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


export type PostAction = IFetchPostsAction | IFetchPostsSuccessAction | IFetchPostsErrorAction