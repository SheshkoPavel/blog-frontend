import React from 'react';
import {postToDeletedThunk, postToPublishedThunk, postToSavedThunk} from "../../store/action-creators/postsAC";
import {useAppDispatch} from "../../hooks";

const ButtonsGroup = (props: any) => {

    const dispatch = useAppDispatch()

    return (
        <div>
            {
              props.post.status === 'PUBLISHED'
                ? <div>
                            <a href="/">
                                <button style={{marginRight: 5}} onClick={() => {
                                    dispatch(postToSavedThunk(props.post.id));
                                } }>
                                    В черновики
                                </button>
                            </a>
                            <button style={{marginRight: 5}}>Редактировать статью</button>
                            <a href="/">
                                <button onClick={() => {
                                    dispatch(postToDeletedThunk(props.post.id));
                                } }>Удалить статью
                                </button>
                            </a>
                        </div>
                : <div>
                            <a href="/">
                                <button style={{marginRight: 5}} onClick={() => {
                                    dispatch(postToPublishedThunk(props.post.id));
                                } }>
                                    Опубликовать
                                </button>
                            </a>
                            <button style={{marginRight: 5}}>Редактировать статью</button>
                            <a href="/">
                                <button onClick={() => {
                                    dispatch(postToDeletedThunk(props.post.id));
                                } }>Удалить статью
                                </button>
                            </a>

                        </div>
            }

        </div>
    );
};

export default ButtonsGroup;