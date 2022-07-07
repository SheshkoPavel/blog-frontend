import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchPosts} from "../../store/action-creators/postsAC";
import './PostsPage.scss'
import Posts from "./Posts";

const PostsPage: React.FC = () => {

    const {posts, isLoading, error} = useAppSelector(state => state.posts)

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

    console.log(posts)

    const postsItems = posts.map((post, index) => <Posts key={post.id}
                                                         id={post.id}
                                                         title={post.title}
                                                         content={post.content}
                                                         image={post.image}
                                                         index={index + 1}
                                                         posts={post}
    />)

    return (
        <section className='posts__content'>
            <div style={{marginBottom: 10, fontWeight: "bold"}}>Тут дофига интересных Статей</div>
            {
                postsItems
            }
        </section>
    );
};

export default PostsPage;