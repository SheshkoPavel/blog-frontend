import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getStatisticThunk} from "../../store/reducers/statisticReducer";

const StatisticPage: React.FC = () => {

    const {posts, comments, isLoading, error} = useAppSelector(state => state.stats)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getStatisticThunk())
    }, [])

    if (isLoading) return <h1>Загрузка статистики</h1>
    if (error) return <h1>{error}</h1>

    return (
        <div>
            <h1>Статистика приложения:</h1>
            <div>
                <p>Количество опубликованных постов: {posts.publishedPostsCount}</p>
                <p>Количество не опубликованных постов (черновиков): {posts.savedPostsCount}</p>
                <p>Количество комментариев за последние 24 часа: {comments.dailyCommentsCount}</p>
            </div>
        </div>
    );
};

export default StatisticPage;