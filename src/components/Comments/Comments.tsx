import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCommentsByPostIdThunk} from "../../store/reducers/commentsReducer";
import AddCommentForm from "./AddCommentForm";
import CommentItem from "./CommentItem";
import './Comments.scss'

const Comments = (props: any) => {

    const {comments, isLoading, error} = useAppSelector(state => state.comments)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getCommentsByPostIdThunk(props.postId))
    }, [])

    if (isLoading) {
        return <h1>...loading of Comments!</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    const commentsElements = comments.map((c) => <CommentItem key={c.id}
                                                              id={c.id}
                                                              author={c.author}
                                                              text={c.text}
                                                              postId={c.postId}
                                                                />)

    return (
        <section className={'comments__module'}>
            <AddCommentForm postId={props.postId} />
            <div className={'comments__title'}>Комментарии:</div>
            <div className={'comments__container'} >
                {!!commentsElements[0]
                    ? commentsElements
                    : <em>Комментариев нет</em>
                }
            </div>
        </section>
    );
};

export default Comments;