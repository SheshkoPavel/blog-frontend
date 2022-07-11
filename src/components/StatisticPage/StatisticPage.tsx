import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getStatisticThunk} from "../../store/reducers/statisticReducer";
import './StatisticPage.scss'

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
                <p>Количество опубликованных постов: <span>{posts.publishedPostsCount}</span> </p>
                <p>Количество не опубликованных постов (черновиков): <span>{posts.savedPostsCount}</span> </p>
                <p>Количество комментариев за последние 24 часа: <span>{comments.dailyCommentsCount}</span> </p>
            </div>
        </div>
    );
};

export default StatisticPage;