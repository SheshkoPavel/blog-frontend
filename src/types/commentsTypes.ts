export enum CommentsActionTypes {
    FETCH_COMMENTS = 'FETCH_COMMENTS',
    FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS',
    FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR',
    ADD_COMMENT = 'ADD_COMMENT'
}

export type commentsArray = {
    id: number;
    author: string;
    text: string;
    postId: number;
}

export interface ICommentsState {
    comments: commentsArray[];
    isLoading: boolean;
    error: string | null;
}

interface IFetchCommentsAction {
    type: CommentsActionTypes.FETCH_COMMENTS;
}

interface IFetchCommentsActionSuccess {
    type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS;
    payload: commentsArray[];
}

interface IFetchCommentsActionError {
    type: CommentsActionTypes.FETCH_COMMENTS_ERROR;
    payload: string;
}

interface IAddCommentAction {
    type: CommentsActionTypes.ADD_COMMENT;
    payload: commentsArray;
}

export type CommentsActions = IFetchCommentsAction | IFetchCommentsActionSuccess | IFetchCommentsActionError
                                | IAddCommentAction