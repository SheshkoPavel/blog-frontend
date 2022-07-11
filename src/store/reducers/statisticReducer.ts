import {IStatisticState, StatisticActions, StatisticActionTypes} from "../../types/statisticTypes";
import {Dispatch} from "redux";
import axios from "axios";


const initialState: IStatisticState = {
    posts: {
        publishedPostsCount: 0,
        savedPostsCount: 0
    },
    comments: {
        dailyCommentsCount: 0
    },
    isLoading: false,
    error: null
}

export const statisticReducer = (state = initialState, action: StatisticActions): IStatisticState => {
    switch (action.type) {
        case StatisticActionTypes.LOADING_STATISTIC:
            return {
                ...state,
                isLoading: true
            }
        case StatisticActionTypes.LOADING_STATISTIC_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                comments: action.payload.comments,
                isLoading: false
            }
        case StatisticActionTypes.LOADING_STATISTIC_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getStatisticThunk = () => async (dispatch: Dispatch<StatisticActions>) => {
    try {
        dispatch({type: StatisticActionTypes.LOADING_STATISTIC})
        const responseFromPosts = await axios.get(`http://localhost:5000/posts/stats`)
        const responseFromComments = await axios.get(`http://localhost:5000/comments/stats`)
        dispatch({type: StatisticActionTypes.LOADING_STATISTIC_SUCCESS,
            payload: {posts: responseFromPosts.data, comments: responseFromComments.data}})
    } catch (error) {
        dispatch({type: StatisticActionTypes.LOADING_STATISTIC_ERROR, payload: 'Ошибка при загрузке статистики'})
    }
}