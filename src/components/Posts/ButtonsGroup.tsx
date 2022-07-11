import React, {useState} from 'react';
import {
    fetchPosts,
    postToDeletedThunk,
    postToPublishedThunk,
    postToSavedThunk
} from "../../store/action-creators/postsAC";
import {useAppDispatch} from "../../hooks";
import EditPostForm from "./EditPostForm";

const ButtonsGroup = (props: any) => {

    const dispatch = useAppDispatch()
    const [state, setState] = useState(false)

    return (
        <div>
            {
              props.post.status === 'PUBLISHED'
                ? <div>
                            <a href="/">
                                <button style={{marginRight: 5}} onClick={() => {
                                    dispatch(postToSavedThunk(props.post.id));
                                    dispatch(fetchPosts());
                                } }>
                                    В черновики
                                </button>
                            </a>

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
                                    dispatch(fetchPosts());
                                } }>
                                    Опубликовать
                                </button>
                            </a>
                            <button style={{marginRight: 5}}
                                    onClick={() => {
                                        setState(true)
                                    } }
                            >
                                Редактировать статью
                            </button>
                            <a href="/">
                                <button onClick={() => {
                                    dispatch(postToDeletedThunk(props.post.id));
                                } }>Удалить статью
                                </button>
                            </a>

                        </div>
            }

            { state
              ? <EditPostForm post={props} setState={setState} />
              :  null
            }

        </div>
    );
};

export default ButtonsGroup;