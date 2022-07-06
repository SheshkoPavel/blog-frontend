import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchPosts} from "../../store/action-creators/postsAC";
import './Posts.scss'

const Posts: React.FC = () => {

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

    return (
        <div className='posts__content'>
            <div style={{marginBottom: 10, fontWeight: "bold"}}>Тут дофига интересных Статей</div>
            {
                posts.map((post, index) => <div key={post.id} style={{marginBottom: 30}}> <div>{post.title}</div>
                    <img src={`http://localhost:5000/postImages/${post.image}`} alt="picture" style={{height: 200}}/>
                    <div>{post.content}</div> </div>)
            }
        </div>
    );
};

export default Posts;