import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchPosts, loadAllUserPostsThunk} from "../../store/action-creators/postsAC";
import './PostsPage.scss'
import Posts from "./Posts";
import {NavLink} from "react-router-dom";

const PostsPage: React.FC = () => {

    const {posts, isLoading, error} = useAppSelector(state => state.posts)
    const {isAuth, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

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
                                    if (user?.id) dispatch(loadAllUserPostsThunk(user?.id))
                                }
                            }>
                        Мои публикации
                    </span>
                </div>
                : null
            }

            <div style={{marginBottom: 10, fontWeight: "bold" , textAlign: "center"}}>Опубликованные статьи</div>
            {
                postsItems
            }
        </section>
    );
};

export default PostsPage;