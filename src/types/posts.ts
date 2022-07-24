export interface IPostState {
    posts: postsArray[];
    post: any;
    isLoading: boolean;
    error : null | string;
    totalCount: number;
}

export type postsArray = {
    id: number;
    title: string;
    content: string;
    status: string;
    image: string;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
    FETCH_ONE_POST = 'FETCH_ONE_POST',
    FETCH_ONE_POSTS_SUCCESS = 'FETCH_ONE_POSTS_SUCCESS',
    LOAD_ALL_USER_POSTS = 'LOAD_ALL_USER_POSTS',
    FILTER_POSTS_BY_STATUS_PUBLISHED = 'FILTER_POSTS_BY_STATUS_PUBLISHED',
    FILTER_POSTS_BY_STATUS_SAVED = 'FILTER_POSTS_BY_STATUS_SAVED'
}

interface IFetchPostsAction {
    type: PostActionTypes.FETCH_POSTS;
}

interface IFetchPostsSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: {
        totalCount: number;
        posts: postsArray[];
    };
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

interface ILoadAllUserPosts {
    type: PostActionTypes.LOAD_ALL_USER_POSTS;
    payload: any[];
}

interface IFilterByStatusPublishedAction {
    type: PostActionTypes.FILTER_POSTS_BY_STATUS_PUBLISHED;
}

interface IFilterByStatusSavedAction {
    type: PostActionTypes.FILTER_POSTS_BY_STATUS_SAVED;
}


export type PostAction = IFetchPostsAction
    | IFetchPostsSuccessAction
    | IFetchPostsErrorAction
    | IFetchOnePostAction
    | IFetchOnePostSuccessAction
    | ILoadAllUserPosts
    | IFilterByStatusPublishedAction
    | IFilterByStatusSavedAction