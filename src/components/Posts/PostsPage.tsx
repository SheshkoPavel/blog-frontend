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

    const {posts, isLoading, error, totalCount} = useAppSelector(state => state.posts)
    const {isAuth, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const [myPublicationsState, setMyPublicationsState] = useState(false)


    const [limit, setLimit] = useState(5)

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
                                                         image={post.image}
                                                         index={index + 1}
    />)

    //Узнаём количество страниц. Делим количество всех элементов на количество элементов на странице, округляем вверх
    const pagesCount = Math.ceil(totalCount / limit);
    //Создаём и заполняем массив, равный количеству страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    const onPageChange = (page: number) => {
        dispatch(fetchPosts(limit, page))
    }

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
            <div style={{textAlign: "center"}}>
                {
                    pages.map((page, index) => <span key={index}
                                                     style={{margin: '0 5px'}}
                                                     onClick={() => onPageChange(index +1)}>{page}</span>)
                }
                <div>Сколько на странице?</div>
                <input type="number" min="2" max="10"
                       onChange={(e) => {
                           setLimit(Number(e.currentTarget.value))
                       }} defaultValue={limit}/>
            </div>

        </section>
    );
};

export default PostsPage;