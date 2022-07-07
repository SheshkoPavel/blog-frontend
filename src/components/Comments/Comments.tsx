import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCommentsByPostIdThunk} from "../../store/reducers/commentsReducer";
import AddCommentForm from "./AddCommentForm";
import CommentItem from "./CommentItem";

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
        <section style={{textAlign: 'left', marginTop: 30}}>
            <AddCommentForm postId={props.postId} />
            <div style={{fontWeight: "bold", fontSize: 20, marginLeft: 250, marginBottom: 10}}>Комментарии:</div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 900, marginLeft: 250}}>
                {commentsElements}
            </div>
        </section>
    );
};

export default Comments;