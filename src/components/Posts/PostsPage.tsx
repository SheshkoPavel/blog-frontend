import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    fetchPosts,
    filterPostsByStatusPublished,
    filterPostsByStatusSaved,
    loadAllUserPostsThunk
} from "../../store/action-creators/postsAC";
import './PostsPage.scss'
import Posts from "./Posts";
import {NavLink} from "react-router-dom";

const PostsPage: React.FC = () => {

    const {posts, isLoading, error} = useAppSelector(state => state.posts)
    const {isAuth, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const [myPublicationsState, setMyPublicationsState] = useState(false)


    useEffect(()=> {
        dispatch(fetchPosts())
    }, [])

    if (isLoading) {
        return <h1>...loading of Posts</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    const postsItems = posts.map((post, index) => <Posts key={post.id}
                                                         id={post.id}
                                                         title={post.title}
                                                         content={post.content}
                                                         image={post.image}
                                                         index={index + 1}
                                                         posts={post}
    />)


    return (
        <section className='posts__page__content'>

            {isAuth
                ? <div>
                    <NavLink to={"/addPost"} style={{textDecoration: "none", textAlign: "left", marginRight: 10}} >
                    Добавить Статью
                    </NavLink>
                    |
                    <span style={{textDecoration: "none", marginLeft: 15, cursor: 'pointer'}}
                            onClick={()=> {
                                    if (user?.id) dispatch(loadAllUserPostsThunk(user?.id));
                                    setMyPublicationsState(true)
                                }
                            }>
                        <NavLink to={'/'}>Мои публикации</NavLink>
                    </span>
                </div>
                : null
            }
            {isAuth && myPublicationsState
                ? <div style={{textAlign: "right", cursor: 'pointer'}} >
                    <NavLink to={'/'} style={{marginRight: 5}}
                          onClick={ () => {
                        dispatch(filterPostsByStatusPublished());
                        setMyPublicationsState(false);
                    }}>Показать опубликованные</NavLink>
                    |
                    <NavLink to={'/'} style={{marginLeft: 5}}
                        onClick={ () => {
                            dispatch(filterPostsByStatusSaved());
                            setMyPublicationsState(false);
                        }}>Показать черновики</NavLink>
                </div>
                : null
            }
            <h2 className={'posts__title'}>Статьи</h2>
            {
                postsItems
            }
        </section>
    );
};

export default PostsPage;