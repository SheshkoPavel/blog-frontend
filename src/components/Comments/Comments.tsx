import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCommentsByPostIdThunk} from "../../store/reducers/commentsReducer";

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

    console.log(comments)
    const commentsElements = comments.map((c) => <div key={c.id}>{c.text}</div>)

    return (
        <section style={{textAlign: 'left', marginTop: 30}}>

            <div>Comments:</div>
            <div>
                {commentsElements}
            </div>
        </section>
    );
};

export default Comments;