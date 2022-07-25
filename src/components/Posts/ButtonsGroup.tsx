import React, {useState} from 'react';
import {
    addMultiAuthor,
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
    const [multiAuthorState, setMultiAuthorState] = useState(false)
    const [multiAuthor, setMultiAuthor] = useState('')
    const [sanded, setSanded] = useState(false)

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
                      <button style={{marginRight: 5}}
                              onClick={() => {
                                  setState(true)
                              } }
                      >
                          Редактировать статью
                      </button>
                      <button style={{marginRight: 5}}
                              onClick={() => {
                                  setMultiAuthorState(true)
                              } }
                      >
                          Добавить соавтора
                      </button>
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
                      <button style={{marginRight: 5}}
                              onClick={() => {
                                  setMultiAuthorState(true)
                              } }
                      >
                          Добавить соавтора
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

            { multiAuthorState
                ? <div>
                    <div>Добавить соавтора</div>
                    <input type="text" onChange={(e) =>
                    {setMultiAuthor(e.currentTarget.value)}}
                    />
                    <button onClick={() => {
                        dispatch(addMultiAuthor(props.post.id, multiAuthor));
                        setSanded(true)
                    }
                    }>send</button>
                </div>
                : null
            }
            {sanded
                ? <div style={{color: "red"}}>Отправлено</div>
                : null
            }


        </div>
    );
};

export default ButtonsGroup;