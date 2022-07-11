type PostsStatistic = {
    publishedPostsCount: number;
    savedPostsCount: number;
}

type CommentsStatistic = {
    dailyCommentsCount: number;
}


export interface IStatisticState {
    posts: PostsStatistic;
    comments: CommentsStatistic;
    isLoading: boolean;
    error: string | null;
}

export enum StatisticActionTypes {
    LOADING_STATISTIC = 'LOADING_STATISTIC',
    LOADING_STATISTIC_SUCCESS = 'LOADING_STATISTIC_SUCCESS',
    LOADING_STATISTIC_ERROR = 'LOADING_STATISTIC_ERROR'
}

interface ILoadingStatistic {
    type: StatisticActionTypes.LOADING_STATISTIC;
}

interface ILoadingStatisticSuccess {
    type: StatisticActionTypes.LOADING_STATISTIC_SUCCESS;
    payload: {
        posts: PostsStatistic;
        comments: CommentsStatistic;
    };
}

interface ILoadingStatisticError {
    type: StatisticActionTypes.LOADING_STATISTIC_ERROR;
    payload: string;
}

export type StatisticActions = ILoadingStatistic | ILoadingStatisticSuccess | ILoadingStatisticError